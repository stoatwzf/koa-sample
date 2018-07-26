/**
 * @author stoat
 * @name koa app
 */
const Koa = require('koa');
const app = new Koa();
const route = require('./app-router');

app.context.sayhello = 'yahoo';
// x-response-time
app.use(async (ctx, next) => {
	console.log(ctx.sayhello);
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response
app.use(route());

app.on('error', (err, ctx) => {
	throw err;
});
app.listen(8383, () => {
	console.log('server has start on port: 8383');
});