var Tick = require('../../tick');
var tick = Tick();
console.log(tick);
tick.add(update);

function update(){
	// Do something
	console.log("test");
}
setTimeout(function(){
	tick.remove(update);
	setTimeout(function(){
		tick.stop();
		setTimeout(function(){
			tick.start();
			setTimeout(function(){
				tick.stop();
				setTimeout(function(){
					tick.add(update);
				}, 1000);
			}, 1000);
		}, 1000);
	}, 1000);
}, 1000);