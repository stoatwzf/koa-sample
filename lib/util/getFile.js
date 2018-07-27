/**
 * get file or directory
 * @param {object} ctx context
 * @param {string} path static path
 * @return {string} file
 */
const { join } = require('path');
const { existsSync, statSync } = require('fs');
const reFile = require('./reFile');
const reDir = require('./reDir');
const getFile = async (ctx, path) => {
	const reqPath = join(path, ctx.url);
	const exist = existsSync(reqPath);
	let file = '';

	if (exist){
		const stat = statSync(reqPath);

		if (stat.isDirectory()){
			file = reDir(ctx.url, reqPath);
		} else {
			file = await reFile(reqPath);
		}
	} else {
		file = '404 Not Found!';
	}
	return file;
}

module.exports = getFile;