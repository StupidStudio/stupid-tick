(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Tick = require('../../tick');
var tick = Tick();
tick.add(update);
function update(){
	// Do something
}
setTimeout(function(){
	tick.remove(update);
}, 1000);
},{"../../tick":2}],2:[function(require,module,exports){
/**
 * @fileoverview Tick RAF controller
 * @author david@stupid-studio.com (David Adalberth Andersen)
 */

/**
 * RAF Polyfill
 */
var window = window || {};
var lastTime = 0;
var id;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                               || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame){
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        id = setTimeout(function() { callback(currTime + timeToCall); }, 
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
}

if (!window.cancelAnimationFrame){
     window.cancelAnimationFrame = function() {
        clearTimeout(id);
    };
}       

/**
 * Deferred
 * @constructor
 * @param {object} opts Options for the constructor
 */
function Tick(opts) {
    /**
     * @define {object} Collection of public methods.
     */
    var self = {};

    /**
     * @define {object} options for the constructor 
     */
    var opts = opts || {};

    /**
     * @define {array} Collection of function that should be called on every RAF
     */
    var collection = [];

    /**
     * @define {function} requestAnimationFrame variable
     */
    var raf;

    /**
     * @define {number} Holds the current time every tick
     */
    var now;

    /**
     * @define {number} Holds the last time of every tick
     */
    var then = Date.now();

    /**
     * @define {number} Holds the difference bwteen now and then
     */
    var delta;

    /**
     * @define {number} Frames pr second (defaults to 60fps)
     */
    var fps = opts.fps || 60;

    /**
     * @define {number} Converting fps to miliseconds
     */
    var interval = 1000/fps;

    /**
     * @define {boolean} Control is the loop should run
     */
    var isStopped = false;

    /**
     * Renders update function at fps giving above
     * @param {type} varname description
     * @config {number} now Set the current time
     * @config {number} delta Calculates the difference between now and then
     */
    function render() {
        if (isStopped) return;

        now = Date.now();
        delta = now - then;
        /**
         * If the difference between now and then is bigger than fps (miliseconds) draw collection.
         */
        if (delta >= interval) {
            /** calculates new then time */
            then = now - (delta % interval);
            /** run updates */
            update();
        }

        /** Runs requestAnimationFrame for continues loop */
        raf = window.requestAnimationFrame(render);
    }

    /** Update run all the callbacks stored in collection */
    function update(){
        for (var i = 0; i < collection.length; i++) {
            collection[i]();
        };
    }

    /** Stars the render loop */
    function start(){
        isStopped = false;
        render();
    }

    /** Stops the render loop */
    function stop(){
        isStopped = true;
        if(raf) window.cancelAnimationFrame(raf);
    }

    /** Checks if Tick should stop or start if collection is empty */
    function shouldPlayOrPause() {
        if(collection.length){
            start();
        }else{
            stop();
        }
    }

    /** Adds new callback, but checks if its already added */
    function add(callback) {
        var index = collection.indexOf(callback);
        if (index === -1){
            collection.push(callback);
            shouldPlayOrPause();
        }
    }

    /** Removes callback if its in the collection array */
    function remove(callback) {
        var index = collection.indexOf(callback);
        if (index != -1){
            collection.splice(index, 1);
            shouldPlayOrPause();
        }
    }

    /**
     * Public methos
     * @public {function}
     */
    self.add = add;
    self.remove = remove;
    self.start = start;
    self.stop = stop;

    /**
     * @return {object} Returns public methods
     */
    return self;
}

/** @export */
module.exports = Tick;
},{}]},{},[1]);
