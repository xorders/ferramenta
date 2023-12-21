const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
const PADDING = '=';

/**
 * Encodes a buffer into a base32 string. RFC 4648 compliant.
 *
 * @param {Buffer} input - The buffer to encode.
 * @returns {string} The base32 encoded string.
 */
export const base32encode = (input: Buffer): string => {
	let output = '';
	let offset: number;

	for (offset = 0; offset + 4 < input.length; offset += 5) {
		output += encode5Bytes(input, offset);
	}

	const remaining = input.length - offset;
	if (remaining > 0) {
		output += encodePartial(input, offset, remaining);
	}

	return output;
};

/**
 * Decodes an RFC 4648 base32 encoded string into a Buffer.
 *
 * @param {string} input - The base32 encoded string to decode.
 * @returns {Buffer} - The decoded data as a Buffer.
 */
export const base32decode = (input: string): Buffer => {
	const inputWithoutPadding = input.replace(new RegExp(PADDING + '+$'), '');
	const output = Buffer.alloc(decodedLength(inputWithoutPadding.length));
	let buffer = 0;
	let bits = 0;
	let outputIndex = 0;

	for (const char of inputWithoutPadding) {
		buffer <<= 5;
		buffer |= ALPHABET.indexOf(char);
		bits += 5;

		if (bits >= 8) {
			output[outputIndex++] = (buffer >> (bits - 8)) & 0xff;
			bits -= 8;
		}
	}

	return output;
};

const encode5Bytes = (buffer: Buffer, offset: number): string => {
	const b = buffer.subarray(offset, offset + 5);
	return (
		ALPHABET[b[0] >> 3] +
		ALPHABET[((b[0] & 0x07) << 2) | (b[1] >> 6)] +
		ALPHABET[(b[1] >> 1) & 0x1f] +
		ALPHABET[((b[1] & 0x01) << 4) | (b[2] >> 4)] +
		ALPHABET[((b[2] & 0x0f) << 1) | (b[3] >> 7)] +
		ALPHABET[(b[3] >> 2) & 0x1f] +
		ALPHABET[((b[3] & 0x03) << 3) | (b[4] >> 5)] +
		ALPHABET[b[4] & 0x1f]
	);
};

const encodePartial = (buffer: Buffer, offset: number, length: number): string => {
	const partialBuffer = Buffer.alloc(5);
	buffer.copy(partialBuffer, 0, offset, offset + length);
	const output = encode5Bytes(partialBuffer, 0);
	const outputLength = Math.ceil((length * 8) / 5);
	const paddingLength = 8 - outputLength;
	return output.substring(0, outputLength) + PADDING.repeat(paddingLength);
};

const decodedLength = (encodedLength: number): number => {
	return Math.floor((encodedLength * 5) / 8);
};
