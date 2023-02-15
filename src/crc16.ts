/**
 * CRC16-Modbus implementation
 * @param buffer Buffer with data
 * @returns CRC16-Modbus checksum
 */
export const crc16 = (buffer: Buffer): number => {
	let crc = 0xffff;

	for (let i = 0; i < buffer.length; i++) {
		crc ^= buffer[i];

		for (let j = 0; j < 8; j++) {
			crc = crc & 0x0001 ? (crc >> 1) ^ 0xa001 : crc >> 1;
		}
	}

	return crc;
};
