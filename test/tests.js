var test = require('tape');
var Tick = require('../tick');

test('Tick should run x 3 and stop', function(t){
	t.plan(3);
	var tick = Tick();
	var count = 0;
	tick.add(update);
	function update(){
		t.ok(true, 'Tick update');
		if(count === 2){
			tick.remove(update);
		}else{
			count += 1;
		}
	}
});

test('Tick can\'t add the same function twice', function(t){
	t.plan(1);
	var tick = Tick();
	var count = 0;
	tick.add(update);
	tick.add(update);
	tick.add(update);
	function update(){
		t.ok(true, 'Tick update');
		tick.remove(update);
	}
});
