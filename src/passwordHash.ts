import * as crypto from 'crypto';
import { packBuffers, unpackBuffers } from './packBuffers';
import BufferEncoding from 'buffer';

const DEFAULT_PASSWORD_LENGTH = 256;
const DEFAULT_SALT_LENGTH = 64;
const DEFAULT_ITERATIONS = 10000;
const DEFAULT_DIGEST = 'sha256';
const DEFAULT_ENCODING = 'base64';

type Digest = 'sha256' | 'sha512';
type Encoding = 'hex' | 'base64';

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
	encoding?: Encoding;
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
	encoding: Encoding;
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
			.randomBytes(options?.saltLength ?? DEFAULT_SALT_LENGTH)
			.toString(options?.encoding ?? DEFAULT_ENCODING);
		crypto.pbkdf2(
			password,
			salt,
			options?.iterations ?? DEFAULT_ITERATIONS,
			options?.passwordLength ?? DEFAULT_PASSWORD_LENGTH,
			options?.digest ?? DEFAULT_DIGEST,
			(error, hash) => {
				if (error) {
					return reject(error);
				}

				accept({
					salt,
					hash: hash.toString(options?.encoding ?? DEFAULT_ENCODING),
					iterations: options?.iterations ?? DEFAULT_ITERATIONS,
					digest: options?.digest ?? DEFAULT_DIGEST,
					encoding: options?.encoding ?? DEFAULT_ENCODING,
					passwordLength: options?.passwordLength ?? DEFAULT_PASSWORD_LENGTH,
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
			passwordHash.iterations ?? DEFAULT_ITERATIONS,
			passwordHash?.passwordLength ?? DEFAULT_PASSWORD_LENGTH,
			passwordHash?.digest ?? DEFAULT_DIGEST,
			(error, hash) => {
				if (error) {
					return reject(error);
				}

				accept(passwordHash.hash === hash.toString(passwordHash?.encoding ?? DEFAULT_ENCODING));
			},
		);
	});
};

/**
 * Compresses a password hash into a string.
 * @param hash - The password hash to compress.
 * @returns A Buffer containing the compressed password hash structure.
 * @example
 * const passwordHash = await generatePasswordHash('password'); // default options used
 * const compressedPasswordHash = compressHash(passwordHash); // default encoding used
 * const decompressedPasswordHash = decompressHash(compressedPasswordHash); // default encoding used
 */
export const compressHash = (hash: PasswordHashType): Buffer => {
	const bufferSalt = Buffer.from(hash.salt, hash.encoding);
	const bufferHash = Buffer.from(hash.hash, hash.encoding);
	const bufferDigest = Buffer.from(hash.digest ?? DEFAULT_DIGEST);

	const bufferIterations = Buffer.alloc(4);
	bufferIterations.writeUInt32BE(hash.iterations ?? DEFAULT_ITERATIONS, 0);

	const bufferPasswordLength = Buffer.alloc(4);
	bufferPasswordLength.writeUInt32BE(hash.passwordLength ?? DEFAULT_PASSWORD_LENGTH, 0);

	return packBuffers([bufferSalt, bufferHash, bufferDigest, bufferIterations, bufferPasswordLength]);
};

/**
 * Decompresses a password hash from a string.
 * @param buffer - The password hash to decompress.
 * @param encoding - Encoding for Buffer fields
 * @returns A PasswordHashType object.
 * @example
 * const passwordHash = await generatePasswordHash('password'); // default options used
 * const compressedPasswordHash = compressHash(passwordHash); // default encoding used
 * const decompressedPasswordHash = decompressHash(compressedPasswordHash); // default encoding used
 */
export const decompressHash = (buffer: Buffer, encoding: BufferEncoding = DEFAULT_ENCODING): PasswordHashType => {
	const [salt, hash, digest, iterations, passwordLen] = unpackBuffers(buffer);

	return {
		salt: salt.toString(encoding),
		hash: hash.toString(encoding),
		digest: digest.toString() as Digest,
		iterations: iterations.readUInt32BE(0),
		passwordLength: passwordLen.readUInt32BE(0),
		encoding: encoding as Encoding,
	};
};
