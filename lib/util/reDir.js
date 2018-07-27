/**
 * read directory
 * @param {string} url url
 * @param {string} path path
 * @return {string} html
 */
const walk = require('./walk');
const reDir = (url, path) => {
	const fileList = walk(path);
	let html = '<ul>';

	for (let [index, item ] of fileList.entries()){
		html = `${html}<li><a href="${url === '/' ? '' : url}/${item}">${item}</a></li>`;
	}
	html = `${html}</ul>`;

	return html;
}

module.exports = reDir;