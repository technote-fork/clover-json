/* eslint-disable no-magic-numbers */
import { parseFile } from '../src';
import path from 'path';

const getFilePath = (file: string): string => path.join(__dirname, 'assets', file);
describe('Check if it can parse a clover file', () => {

	it('should parse a normal file', async() => {
		const result = await parseFile(getFilePath('clover1.xml'));
		expect(result.length).toBe(3);
		expect(result[0].file).toBe('coveralls/lib/client.js');
		expect(result[1].file).toBe('coveralls/lib/configuration.js');
		expect(result[2].file).toBe('coveralls/lib/git_commit.js');
		expect(result[0].functions.found).toBe(1);
		expect(result[0].functions.hit).toBe(1);
		expect(result[0].lines.found).toBe(4);
		expect(result[0].lines.hit).toBe(4);
		expect(result[0].functions.details[0].line).toBe(5);
		expect(result[0].functions.details[0].hit).toBe(2);
		expect(result[0].lines.details[0].line).toBe(6);
		expect(result[0].lines.details[0].hit).toBe(2);
	});

	it('should parse a second file', async() => {
		const result = await parseFile(getFilePath('clover2.xml'));
		expect(result[0].file).toBe('hello.world/src/HelloWorld.php');
		expect(result.length).toBe(1);
		expect(result[0].functions.found).toBe(2);
		expect(result[0].functions.hit).toBe(1);
		expect(result[0].lines.found).toBe(4);
		expect(result[0].lines.hit).toBe(1);
	});

	it('should parse a file with an empty class', async() => {
		const result = await parseFile(getFilePath('clover-empty.xml'));
		expect(result.length).toBe(1);
		expect(result[0].file).toBe('hello.world/app/Models/Scenario.php');
		expect(result[0].functions.found).toBe(0);
		expect(result[0].functions.hit).toBe(0);
		expect(result[0].lines.found).toBe(0);
		expect(result[0].lines.hit).toBe(0);
	});

	it('should parse a file without a package property', async() => {
		const result = await parseFile(getFilePath('clover-without-package.xml'));
		expect(result.length).toBe(4);
		expect(result[0].file).toBe('config.php');
		expect(result[1].file).toBe('jira.php');
		expect(result[2].file).toBe('mattermost.php');
		expect(result[3].file).toBe('translate.php');
		expect(result[0].functions.found).toBe(0);
		expect(result[0].functions.hit).toBe(0);
		expect(result[0].lines.found).toBe(1);
		expect(result[0].lines.hit).toBe(1);
	});

	it('should parse a file without a class property', async() => {
		const result = await parseFile(getFilePath('clover-without-class.xml'));
		expect(result.length).toBe(1);
		expect(result[0].file).toBe('index.ts');
		expect(result[0].functions.found).toBe(0);
		expect(result[0].functions.hit).toBe(0);
		expect(result[0].lines.found).toBe(10);
		expect(result[0].lines.hit).toBe(10);
	});

	it('should throw error if file not exists', async() => {
		await expect(parseFile(getFilePath('test'))).rejects.toThrow('no such file or directory');
	});

	it('should throw error if file is invalid', async() => {
		await expect(parseFile(getFilePath('error.xml'))).rejects.toThrow('Unexpected end');
	});
});
