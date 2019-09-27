import fs from 'fs';
import { promisify } from 'util';
import { parseString } from 'xml2js';

type coverageData = { file: { $; line }[] }
const getCoverageData = (projectObj): coverageData[] => Object.prototype.hasOwnProperty.call(projectObj, 'package') ? projectObj.package : [Object.assign({}, projectObj, {$: Object.assign({}, projectObj.$, {name: undefined})})];
const getPackageName = (data): string => Object.prototype.hasOwnProperty.call(data, '$') && Object.prototype.hasOwnProperty.call(data.$, 'name') && data.$.name ? data.$.name + '/' : '';

type classDetail = { name?: string; fileName: string; lines?: { $: { type; name; num; count } }[] }
const classDetailsFromProjects = (projects: []): classDetail[] => {
	const classDetails: classDetail[] = [];

	projects.forEach(projectObj => {
		getCoverageData(projectObj).forEach(data => {
			data.file.forEach(fileObj => {
				if (Object.prototype.hasOwnProperty.call(fileObj, 'class')) {
					fileObj['class'].forEach(classObj => {
						classDetails.push({
							name: classObj.$.name,
							fileName: getPackageName(data) + fileObj.$.name,
							lines: fileObj.line,
						});
					});
				} else {
					classDetails.push({
						fileName: getPackageName(data) + fileObj.$.name,
						lines: fileObj.line,
					});
				}
			});
		});
	});
	return classDetails;
};

type methodStat = { name: string; line: number; hit: number }
type lineStat = { line: number; hit: number }
type classCov = { title?: string; file: string; functions: { found: number; hit: number; details: methodStat[] }; lines: { found: number; hit: number; details: lineStat[] } }
const unpackage = (projects): classCov[] => {
	const classDetails = classDetailsFromProjects(projects);

	return classDetails.map(detail => {
		const methodStats: methodStat[] = detail.lines ? detail.lines.filter(line => line.$.type === 'method').map(line => ({
			name: line.$.name,
			line: Number(line.$.num),
			hit: Number(line.$.count),
		})) : [];
		const lineStats: lineStat[] = detail.lines ? detail.lines.filter(line => line.$.type !== 'method').map(line => ({
			line: Number(line.$.num),
			hit: Number(line.$.count),
		})) : [];

		return {
			title: detail.name,
			file: detail.fileName,
			functions: {
				found: methodStats.length,
				// eslint-disable-next-line no-magic-numbers
				hit: methodStats.filter(val => val.hit > 0).length,
				details: methodStats,
			},
			lines: {
				found: lineStats.length,
				// eslint-disable-next-line no-magic-numbers
				hit: lineStats.filter(val => val.hit > 0).length,
				details: lineStats,
			},
		};
	});
};

export const parseContent = (xml: string): Promise<classCov[]> => {
	return new Promise((resolve, reject): void => {
		parseString(xml, (err, parseResult) => {
			if (err) {
				reject(err);
			} else {
				resolve(unpackage(parseResult.coverage.project));
			}
		});
	});
};

export const parseFile = async(filePath: string): Promise<classCov[]> => {
	return await parseContent(await promisify(fs.readFile)(filePath, 'utf-8'));
};
