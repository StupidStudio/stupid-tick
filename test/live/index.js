var Tick = require('../../tick');
var tick = Tick();
var count = 0;
tick.add(update);
function update(){
	if(count === 50){
		console.log("remove");
		tick.remove(update);
		setTimeout(function(){
			count = 0;
			tick.add(update);
		}, 500);
	}
	count += 1;
	// console.log(count);
}

// var to;
// test();
// function test(){
// 	if(count >= 5){
// 		clearTimeout(to);
// 		return;
// 	}
// 	count += 1;
// 	console.log(count);
// 	to = setTimeout(function(){
// 		test();
// 	},1000 / 60);
// }
