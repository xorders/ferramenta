import * as crypto from 'crypto';

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
type PasswordHashType = {
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
type PasswordHashOptions = {
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
