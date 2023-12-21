/**
 * Packs an array of buffers into a single buffer.
 * @param buffers
 * @returns A buffer containing the packed buffers.
 * @example
 * const bufferA = Buffer.from('Hello');
 * const bufferB = Buffer.from('World');
 * const packedBuffers = packBuffers([bufferA, bufferB]);
 * console.log(packedBuffers.toString('hex')); // 010548656c6c6f05576f726c64
 */
export const packBuffers = (buffers: Buffer[]): Buffer => {
	const maxBufferLength = buffers.reduce((max, buffer) => Math.max(max, buffer.length), 0);
	let lengthBufferLength = 1;

	if (maxBufferLength > 255 && maxBufferLength <= 65535) {
		lengthBufferLength = 2;
	} else if (maxBufferLength > 65535) {
		lengthBufferLength = 4;
	}

	const buffersLV = buffers.map((buffer) => {
		const length = Buffer.alloc(lengthBufferLength);
		switch (lengthBufferLength) {
			case 1:
				length.writeUInt8(buffer.length);
				break;
			case 2:
				length.writeUInt16BE(buffer.length);
				break;
			case 4:
				length.writeUInt32BE(buffer.length);
				break;
		}
		return Buffer.concat([length, buffer]);
	});

	const lengthBuffer = Buffer.alloc(1);
	lengthBuffer.writeUInt8(lengthBufferLength);
	buffersLV.unshift(lengthBuffer);

	return Buffer.concat(buffersLV);
};

/**
 * Unpacks a buffer into an array of buffers.
 * @param buffer
 * @returns An array of buffers.
 * @example
 * const buffer = Buffer.from('010548656c6c6f05576f726c64', 'hex');
 * const [bufferA, bufferB] = unpackBuffers(buffer);
 * console.log(bufferA.toString()); // Hello
 * console.log(bufferB.toString()); // World
 */
export const unpackBuffers = (buffer: Buffer): Buffer[] => {
	const lengthBufferLength = buffer.readUInt8(0);
	const buffers: Buffer[] = [];
	let offset = 1;
	while (offset < buffer.length) {
		const length = buffer.readUIntBE(offset, lengthBufferLength);
		offset += lengthBufferLength;
		buffers.push(buffer.subarray(offset, offset + length));
		offset += length;
	}
	return buffers;
};
