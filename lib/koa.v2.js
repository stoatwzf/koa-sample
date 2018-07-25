const Koa = require('koa');
const convert = require('koa-convert');
const loggerGenerator = require('./logger-generator');
const loggerAsync = require('./logger-async');
const app = new Koa();

app.use(convert(loggerGenerator()));
app.use(loggerAsync());
app.use(ctx => {
	ctx.body = 'hello world';
});

app.listen(8383);