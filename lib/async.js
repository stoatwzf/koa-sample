const getSyncTime = () => {
	return new Promise((resolve, reject) => {
		try {
			let start = Date.now();

			setTimeout(() => {
				resolve(Date.now() - start);
			}, 1000);
		} catch (err){
			reject(err);
		}
	});
};
const getSyncData = async () => {
	const start = await getSyncTime();
	const end = await getSyncTime();
	const data = start + end;

	return data;
};
const genFn = function *(){
	const start = yield getSyncTime();
	const end = yield getSyncTime();

	return ({
		start,
		end
	});
}

getSyncData()
	.then(data => {
		console.log(data);
	});
for (const val of genFn()){
	val
		.then(data => {
			console.log(data);
		});
}
