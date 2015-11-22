var Tick = require('../../tick');
var tick = Tick();
var count = 0;
tick.add(update);
function update(){
	if(count === 5){
		tick.remove(update);
	}
	count += 1;
	console.log(count);
}
