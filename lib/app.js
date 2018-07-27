const Koa = require('koa');
const { join } = require('path');
const getFile = require('./util/getFile');
const parseMime = require('./util/parseMime');
const static = require('koa-static');
const app = new Koa();

app.use(static(join(__dirname, 'static')));
/*app.use(async ctx => {
	const staticPath = join(__dirname, 'static');
	const file = await getFile(ctx, staticPath);
	const mime = parseMime(ctx.url);
	
	if (mime){
		ctx.type = mime;
	}
	if (mime && mime.indexOf('image/') >= 0){
		ctx.res.writeHead(200);
		ctx.res.write(file, 'binary');
		ctx.res.end();
	} else {
		ctx.body = file;
	}
});*/

app.listen(8080, () => {
	console.log('static server is start at port 8080');
});