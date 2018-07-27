/**
 * get file
 *@param {string} path file path
 *@return {string|binary} file
 */
const { readFile } = require('fs');
const reFile = path => {
	return new Promise((resolve, reject) => {
		readFile(path, 'binary', (err, data) => {
			if (err){
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
}

module.exports = reFile;