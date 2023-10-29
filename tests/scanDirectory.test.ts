import { scanDirectory } from '../src';
import path from 'path';

const DIRECTORY = 'tests/data/tree';

test('scan non-recursively - one result', () => {
	expect(scanDirectory(DIRECTORY, '*.file', false)).toEqual([path.join(DIRECTORY, 'test.file')]);
});

test('scan non-recursively - multiple result', () => {
	expect(scanDirectory(DIRECTORY, '*.data', false)).toEqual([
		path.join(DIRECTORY, 'data.data'),
		path.join(DIRECTORY, 'test.data'),
	]);
});

test('scan recursively - one result', () => {
	expect(scanDirectory(DIRECTORY, '*.recursive', true)).toEqual([
		path.join(DIRECTORY, 'folder1/folder1-2/file.recursive'),
	]);
});

test('scan recursively - multiple result', () => {
	expect(scanDirectory(DIRECTORY, '*.text', true)).toEqual([
		path.join(DIRECTORY, 'bogus.text'),
		path.join(DIRECTORY, 'folder1/bogus.text'),
		path.join(DIRECTORY, 'folder1/folder1-1/bogus.text'),
		path.join(DIRECTORY, 'folder1/folder1-1/text.text'),
		path.join(DIRECTORY, 'folder1/folder1-2/bogus.text'),
		path.join(DIRECTORY, 'folder1/folder1-3/bogus.text'),
		path.join(DIRECTORY, 'folder1/folder1-3/text.text'),
		path.join(DIRECTORY, 'folder1/text.text'),
		path.join(DIRECTORY, 'folder2/bogus.text'),
		path.join(DIRECTORY, 'folder2/folder2-1/text.text'),
		path.join(DIRECTORY, 'text.text'),
	]);
});
