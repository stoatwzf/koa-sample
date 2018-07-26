const { readFile } = require('fs');
/**
 * Promise readFile
 * @param {string} page htmlname
 * @return {promise} asyncPromise
 */
const render = page => {
	return new Promise((resolve, reject) => {
		readFile(`public/${page}.html`, 'binary', (err, data) => {
			if (err){
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};
/**
 * url get page
 * @param {string} url ctx.url
 * @return {string} html
 */
const route = async url => {
	let view = '404';

	switch (url){
		case '/':
		case '/index':
			view = 'index';
			break;
		case '/todo':
			view = 'todo';
			break;
	}
	const html = await render(view);

	return html;
};

module.exports = () => {
	return async (ctx, next) => {
		const html = await route(ctx.url);

		ctx.body = html;
		await next();
	}
};