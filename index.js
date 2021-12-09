const aFuncToAsync = () => {
	return new Promise(resolve => {
		setTimeout(() => resolve('I did it!', 3000))
	})
}

const anAsyncFunc = async () => {
	console.log(await aFuncToAsync());
}

const aPromiseFunc = () => {
	return Promise.resolve('promise test')
}
const awaitFunc = async () => {
	return 'await test'
}

console.log('before');
anAsyncFunc()
awaitFunc().then(res => {
	console.log(res);
})
aPromiseFunc().then(res => {
	console.log(res);
})
console.log('after');