var Tick = require('../../tick');
var tick = Tick();
tick.add(update);
function update(){
	// Do something
}
setTimeout(function(){
	tick.remove(update);
}, 1000);