const log = ctx => {
	console.log(`generator middleware: ${ctx.method} ${ctx.url}`);
};

module.exports = () => {
	return function *(next){
		log(this);
		if (next){
			yield next;
		}
	}
}