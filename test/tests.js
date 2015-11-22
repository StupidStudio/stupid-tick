var test = require('tape');
var Tick = require('../tick');

test('Tick should run and stop', function(t){
	t.plan(6);
	var tick = Tick();
	var count = 0;
	tick.add(update);
	function update(){
		if(count === 5){
			tick.remove(update);
		}
		count += 1;
		t.ok(true);
	}
});
