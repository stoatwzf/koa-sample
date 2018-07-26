const Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
	const { query, querystring } = ctx.request;

	ctx.body = {
		query,
		querystring
	}
});

app.listen(8383);