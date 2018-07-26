const Koa = require('koa');
const { parse } = require('url');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const parsePostData = ctx => {
	return new Promise((resolve, reject) => {
		try {
			let postData = '';

			ctx.req.on('data', chunk => {
				postData += chunk;
			});
			ctx.req.on('end', () => {
				const parseData = parse('?' + postData, true).query;
				console.log(ctx.query)
				resolve(parseData);
			});
		} catch (err){
			reject(err);
		}
	});
};


app.use(bodyParser());
app.use(async ctx => {
	if (ctx.url === '/' && ctx.method === 'GET'){
		let html = `
      <h1>koa2 request post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `;

    ctx.body = html;
	} else if (ctx.url === '/' && ctx.method === 'POST'){
		// const postData = await parsePostData(ctx);
		const postData = ctx.request.body;

		ctx.body = postData;
	} else {
		ctx.body = '<h1>404</h1>';
	}
});

app.listen(8383);