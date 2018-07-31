const Koa = require('koa');
const { join } = require('path');
const static = require('koa-static');
const views = require('koa-views');
const uploadFile = require('./util/uploadFile');

const app = new Koa();

app.use(static(join(__dirname, 'static')));
app.use(views(join(__dirname, 'view'), { extension: 'ejs' }));
app.use(async ctx => {
	if (ctx.method === 'GET' && ctx.url === '/index'){
		await ctx.render('index', {
			title: 'Home Page'
		});
	} else if (ctx.url === '/api/picture/upload' && ctx.method === 'POST'){
		const result = await uploadFile(ctx, {
			fileType: 'album',
      path: join( __dirname, 'static/image' )
		});

		ctx.body = result;
	} else {
		await ctx.render('404', {
			title: '404 Not Found'
		});
	}
});

app.listen(3000, () => {
  console.log('server has started at port: 3000');
});