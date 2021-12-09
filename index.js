const fs = require('fs')

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

const getFile = (filename) => {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, (err, data) => {
			if (err) {
				console.log(err)
				reject(err)
				return
			}

			// console.log("data: ", data)
			resolve(data)
		})
	})
}

const getFirstUserData = () => {
	getFile('./users.json')
		.then(res => JSON.parse(res))
		.then(res => {
			return res[0].name;
		})
		.then(userName => {
			return getFile(`./users/${userName}.json`)
		})
		.then(res => JSON.parse(res))
		.then(res => {
			console.log(res.description);
		})
}

getFirstUserData()

const getSecondUserDataAsync = async () => {
	const response = await getFile('./users.json')
	const users = await JSON.parse(response)
	const user = users[1]
	const userResponse = await getFile(`./users/${user.name}.json`)
	const userData = await JSON.parse(userResponse)
	console.log("radnom: ", userData.description);
	return userData
}

getSecondUserDataAsync()


const promiseToDoSomething = () => {
	return new Promise(resolve => {
		setTimeout(() => resolve('I did something'), 10000)
	})
}

const watchOverOther = async () => {
	const something = await promiseToDoSomething()
	return something + '\nand I watched'
}

const watchInception = async () => {
	const something = await watchOverOther()
	return something + '\nand I watched too'
}

watchInception().then(res => {
	console.log(res);
})