// let promise = new Promise(function(resolve, reject){

// 	//cleaning room
// 	let isClean = true;

// 	if (isClean) {
// 		resolve('clean');
// 	} else {
// 		reject('not clean');
// 	}
// });

// promise.then(function(result){
// 	console.log('The room is ',result);
// }).then(function(result){
// 	console.log('The room is ',result);
// }).catch(function(result){
// 	console.log('The room is ',result);
// })
// let cleanRoom = function() {
// 	return new Promise(function(resolve, reject) {
// 		console.log('Main method:','Start...')
// 		resolve('callin 1 .then()')
// 	});
// };

// let cleanGarbage = function(p) {
// 	return new Promise(function(resolve, reject) {
// 		resolve(p+' Removed Garbage')
// 	});
// };

// let winIcecream = function(p) {
// 	return new Promise(function(resolve, reject) {
// 		resolve(p+' Won Icecream')
// 	});
// };

const util = require('util');

let cleanRoom = function() {

	console.log('Main method:','Start...')
	return 'callin 1 .then()';
};


cleanRoom = util.promisify(cleanRoom);

cleanRoom().then(function(result){
	console.log(result)
	return 'callin 2 .then()';
}).then(function(result){
	console.log(result)
	return 'callin 3 .then()';
}).then(function(result){
	console.log(result)
	console.log('Finished ');
})
// cleanRoom().then(function(result){
// 	return cleanGarbage(result);
// }).then(function(result){
// 	return winIcecream(result);
// }).then(function(result){
// 	console.log('Finished ',result);
// })

// Promise.race([cleanRoom(), cleanGarbage(), winIcecream()]).then(function(){
// 	console.log('all finished');
// });

