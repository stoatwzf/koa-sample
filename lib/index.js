/**
 * @author stoat
 * @name koa app
 */
const Koa = require('koa');
const app = new Koa();

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
app.use(async ctx => {
	ctx.body = 'Hello World';
});

app.on('error', (err, ctx) => {
	throw err;
});
app.listen(8383);
console.log(app.env);
console.log(app.proxy);
console.log(app.subdomainOffset);