const log = ctx => {
	console.log(`async middleware: ${ctx.method} ${ctx.url}`);
};

module.exports = () => {
	return async (ctx, next) =>  {
		log(ctx);
		await next();
	};
};