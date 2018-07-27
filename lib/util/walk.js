/**
 * read dir and file
 * @param {string} path file path
 * @return {array} file list
 */
const { readdirSync } = require('fs');
const mimes = require('../common/mimes');
const walk = path => {
	const files = readdirSync(path);
	const dirList = [];
	const fileList = [];

	console.log(files);
	for (let i = 0; i < files.length; i += 1){
		const item = files[i];
		const itemArr = item.split('\.');
		const itemMime = (itemArr.length > 1) ? itemArr[itemArr.length - 1] : 'undefined';

		if (typeof mimes[itemMime] === 'undefined'){
			dirList.push(files[i]);
		} else {
			fileList.push(files[i]);
		}
	}
	const result = dirList.concat(fileList);

	return result;
}

module.exports = walk;