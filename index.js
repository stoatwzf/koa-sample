const repromise = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve(4);
		}, 2000);
	});
};
const gfn = function * (){
	const a = yield 3;
	const b = yield 2;
}
const afn = async () => {
	const a = await repromise();
	const b = await repromise();
	const c = await repromise();

	return a + b + c;
}
const iter = gfn(3);

for (const it of iter){
	console.log(it)
}
afn().then(data => {
	console.log(data);
})