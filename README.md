# Stupid Tick 
A simple RAF controller

## Usage

Using the tick object. (OBS: Dont use anonymous functions).

```javascript
var Tick = require('stupid-tick');
var tick = Tick();
tick.add(update);
function update(){
	// Do something
}
setTimeout(function(){
	tick.remove(update);
}, 1000);

```

Change framerate:

```javascript
var tick = Tick({fps:15}); // default 60fps
```

Create a singleton of the tick for performance, so you only have one RAF loop:

```javascript
// npm i stupid-singleton (get the singleton module)
var Singleton = require('stupid-singleton');
var TickConstructor = require('stupid-tick');
var Tick = Singleton(TickConstructor);
var tick = Tick.getInstance();
tick.add(update);
function update(){
	// Do something
}
setTimeout(function(){
	tick.remove(update);
}, 1000);

```