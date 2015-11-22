/**
 * @fileoverview Tick RAF controller
 * @author david@stupid-studio.com (David Adalberth Andersen)
 */

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
     * Renders update function at fps giving above
     * @param {type} varname description
     * @config {number} now Set the current time
     * @config {number} delta Calculates the difference between now and then
     */
    function render() {
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
        raf = requestAnimationFrame(render);
    }

    /** Update run all the callbacks stored in collection */
    function update(){
        for (var i = 0; i < collection.length; i++) {
            collection[i]();
        };
    }

    /** Stars the render loop */
    function start(){
        if(!raf) render();
    }

    /** Stops the render loop */
    function stop(){
        cancelAnimationFrame(raf);
        raf = false;
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