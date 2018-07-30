const Koa = require('koa');
const { join } = require('path');
const getFile = require('./util/getFile');
const parseMime = require('./util/parseMime');
const static = require('koa-static');
const session = require('koa-session');
const views = require('koa-views');
const upload = require('./util/upload');
const app = new Koa();
const CONFIG = {
	key: 'koa:sess',
	maxAge: 10 * 60 * 1000,
	overwrite: true,
	signed: true,
	rolling: false,
	renew: false
};

app.keys = ['some secret hurr'];
app.use(static(join(__dirname, 'static')));
app.use(views(join(__dirname, './view'), { extension: 'ejs' }));
app.use(session(CONFIG, app));
app.use(async ctx => {
	if (ctx.url === '/favicon.ico') return;
	let n = ctx.session.views || 0;

	if (ctx.url === '/index'){
		ctx.session.views = ++n;
		await ctx.render('index', {
			title: 'hello koa',
			num: n
		});
	} else if (ctx.url === '/upload' && ctx.method === 'POST'){
		const result = await upload(ctx, {
			fileType: 'album',
			path: join(__dirname, 'uploadFiles')
		});

		ctx.body = result;
	} else {
		ctx.body = '404'
	}
});
/*
app.use(async ctx => {
	if (ctx.url === '/index'){
		ctx.cookies.set('cid', 'hello world', {
			domain: '127.0.0.1',
			path: '/index',
			maxAge: 10 * 60 * 1000,
			expires: new Date(Date.now() + 1000),
			httpOnly: false,
			overwrite: true
		});
		ctx.body = 'cookie is ok';
	} else {
		ctx.body = 'hello world';
	}
});
app.use(async ctx => {
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