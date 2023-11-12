import * as crypto from 'crypto';
import { packBuffers, unpackBuffers } from './packBuffers';
import BufferEncoding from 'buffer';

const PASSWORD_LENGTH = 256;
const SALT_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = 'sha256';
const BYTE_TO_STRING_ENCODING = 'hex';

type Digest = 'sha256' | 'sha512';
type ByteToStringEncoding = 'hex' | 'base64';

/**
 * PasswordHashType is the type of the object that should be stored in the database or otherwise persisted.
 */
export type PasswordHashType = {
	/** Randomly generated salt used to generate the password hash. */
	salt: string;
	/** The password hash. */
	hash: string;
	/** The number of iterations used to generate the password hash. */
	iterations: number;
	/** The digest used to generate the password hash. */
	digest?: Digest;
	/** The byte to string encoding used to generate the password hash. */
	byteToStringEncoding?: ByteToStringEncoding;
	/** The length of the password hash. */
	passwordLength?: number;
};

/**
 * PasswordHashOptions is the type of the object that is passed to the generatePasswordHash function.
 */
export type PasswordHashOptions = {
	passwordLength: number;
	saltLength: number;
	iterations: number;
	digest: Digest;
	byteToStringEncoding: ByteToStringEncoding;
};

/**
 * Generates a password hash that can be stored in the database.
 * Each password hash is generated with a random salt.
 * @param password - The password to hash.
 * @param options - The options to use when generating the password hash. Please refer to constants for default values.
 * @returns A promise that resolves to a PasswordHashType object.
 * @example
 * const passwordHash = await generatePasswordHash('password'); // default options used
 */
export const generatePasswordHash = (
	password: string,
	options?: Partial<PasswordHashOptions>,
): Promise<PasswordHashType> => {
	return new Promise<PasswordHashType>((accept, reject) => {
		const salt = crypto
			.randomBytes(options?.saltLength ?? SALT_LENGTH)
			.toString(options?.byteToStringEncoding ?? BYTE_TO_STRING_ENCODING);
		crypto.pbkdf2(
			password,
			salt,
			options?.iterations ?? ITERATIONS,
			options?.passwordLength ?? PASSWORD_LENGTH,
			options?.digest ?? DIGEST,
			(error, hash) => {
				if (error) {
					return reject(error);
				}

				accept({
					salt,
					hash: hash.toString(options?.byteToStringEncoding ?? BYTE_TO_STRING_ENCODING),
					iterations: options?.iterations ?? ITERATIONS,
					digest: options?.digest ?? DIGEST,
					byteToStringEncoding: options?.byteToStringEncoding ?? BYTE_TO_STRING_ENCODING,
					passwordLength: options?.passwordLength ?? PASSWORD_LENGTH,
				});
			},
		);
	});
};

/**
 * Verifies a password hash against a password attempt.
 * @param passwordHash - The password hash to verify against.
 * @param passwordAttempt - The password attempt to verify.
 * @returns A promise that resolves to a boolean indicating whether the password attempt matches the password hash.
 * @example
 * const passwordHash = await generatePasswordHash('password'); // default options used
 * const isPasswordValid = await verifyPasswordHash(passwordHash, 'password'); // default options used
 */
export const verifyPasswordHash = (passwordHash: PasswordHashType, passwordAttempt: string): Promise<boolean> => {
	return new Promise<boolean>((accept, reject) => {
		crypto.pbkdf2(
			passwordAttempt,
			passwordHash.salt,
			passwordHash.iterations,
			passwordHash?.passwordLength ?? PASSWORD_LENGTH,
			passwordHash?.digest ?? DIGEST,
			(error, hash) => {
				if (error) {
					return reject(error);
				}

				accept(passwordHash.hash === hash.toString(passwordHash?.byteToStringEncoding ?? BYTE_TO_STRING_ENCODING));
			},
		);
	});
};

/**
 * Compresses a password hash into a string.
 * @param hash - The password hash to compress.
 * @param encoding - The encoding to use when converting the buffers to strings.
 * @returns A string representing the password hash.
 * @example
 * const passwordHash = await generatePasswordHash('password'); // default options used
 * const compressedPasswordHash = compressHash(passwordHash); // default encoding used
 * const decompressedPasswordHash = decompressHash(compressedPasswordHash); // default encoding used
 * const isPasswordValid = await verifyPasswordHash(decompressedPasswordHash, 'password'); // default options used
 * console.log(isPasswordValid); // true
 */
export const compressHash = (hash: PasswordHashType, encoding: BufferEncoding = BYTE_TO_STRING_ENCODING): string => {
	const bufferSalt = Buffer.from(hash.salt, hash.byteToStringEncoding);
	const bufferHash = Buffer.from(hash.hash, hash.byteToStringEncoding);
	const bufferDigest = Buffer.from(hash.digest ?? DIGEST);

	const bufferIterations = Buffer.alloc(4);
	bufferIterations.writeUInt32BE(hash.iterations ?? ITERATIONS, 0);

	const bufferPasswordLength = Buffer.alloc(4);
	bufferPasswordLength.writeUInt32BE(hash.passwordLength ?? PASSWORD_LENGTH, 0);

	const bufferResult = packBuffers([bufferSalt, bufferHash, bufferDigest, bufferIterations, bufferPasswordLength]);
	return bufferResult.toString(encoding);
};

/**
 * Decompresses a password hash from a string.
 * @param hash
 * @param encoding
 * @returns A PasswordHashType object.
 * @example
 * const passwordHash = await generatePasswordHash('password'); // default options used
 * const compressedPasswordHash = compressHash(passwordHash); // default encoding used
 * const decompressedPasswordHash = decompressHash(compressedPasswordHash); // default encoding used
 * const isPasswordValid = await verifyPasswordHash(decompressedPasswordHash, 'password'); // default options used
 * console.log(isPasswordValid); // true
 */
export const decompressHash = (hash: string, encoding: BufferEncoding = BYTE_TO_STRING_ENCODING): PasswordHashType => {
	const buffer = Buffer.from(hash, encoding);
	const [bufferSalt, bufferHash, bufferDigest, bufferIterations, bufferPasswordLength] = unpackBuffers(buffer);

	const iterations = bufferIterations.readUInt32BE(0);
	const passwordLength = bufferPasswordLength.readUInt32BE(0);

	return {
		salt: bufferSalt.toString(encoding),
		hash: bufferHash.toString(encoding),
		digest: bufferDigest.toString() as Digest,
		iterations,
		passwordLength,
		byteToStringEncoding: encoding as ByteToStringEncoding,
	};
};
