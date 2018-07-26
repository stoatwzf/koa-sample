const Koa = require('koa');
const { readFile } = require('fs');
const Router = require('koa-router');
const app = new Koa();
const router = new Router();
const index = require('./router/index');
const home = require('./router/home');
const about = require('./router/about');


router.use('/', index);
router.use('/page', home);
router.use('/about', about);

app.use(router.routes());
app.use(async ctx => {
	ctx.body = '404';
});
app.listen(8383, () => {
	console.log('server start on port: 8383');
});