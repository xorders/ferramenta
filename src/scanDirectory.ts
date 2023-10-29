import { matchWildcard } from './matchWildcard';
import * as fs from 'fs';
import path from 'path';

/**
 * Scan a directory for files matching a wildcard
 * @param directory Directory to scan
 * @param wildcard Wildcard to match (e.g. *.js)
 * @param recursive Whether to scan recursively
 * @returns [string] File names
 * @example
 * scanDirectory('/path/to/dir', '*.js') // ['file1.js', 'file2.js', 'abc.js']
 * scanDirectory('/path/to/dir', 'file*.js, true) // ['file1.js', 'folder/file2.js']
 */
export const scanDirectory = (directory: string, wildcard: string, recursive = true) => {
	// Ensure the directory exists and it is indeed a directory
	if (!fs.existsSync(directory) || !fs.statSync(directory).isDirectory()) {
		throw new Error('Invalid directory');
	}

	// Resultant array of matched files
	let matchedFiles: string[] = [];

	// Read the directory contents
	const files = fs.readdirSync(directory);

	files.forEach((file) => {
		const filePath = path.join(directory, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory() && recursive) {
			// If it's a directory, and we're scanning recursively, scan it
			matchedFiles = matchedFiles.concat(scanDirectory(filePath, wildcard, recursive));
		} else if (stat.isFile()) {
			// If it's a file, check if it matches the wildcard
			if (matchWildcard(file, wildcard)) {
				matchedFiles.push(filePath);
			}
		}
	});

	return matchedFiles;
};
