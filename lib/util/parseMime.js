/**
 * get extname
 * @param {string} url ctx.url
 * @return {string} extanme
 */
const { extname } = require('path');
const mimes = require('../common/mimes.json');

module.exports = url => {
	let extName = extname(url);

	extName = extName ? extName.slice(1) : 'unkown';
	return mimes[extName];
}