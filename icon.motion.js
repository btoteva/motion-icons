/*! jQuery iconMotion v1.00.03 | 2014 */

var icon_prefix = 'icon';
var iconClasses=['heritage','next', 'more'];

jQuery.fn.iconMotion = function(options){
	var vars = {
		frames: 10,
		event: 'mouseenter mouseleave'
	}

	var root = this;
	
	var iconSelector = $(this);
	var $container;
	var timeout;
	var countFrom=framesCounted=1;
	var countTo;
	var interval=2;
	var easing=0;
	var className;
	var direction=-1;
	var EasingFunctions = {
	  linear: function (t) { return t },
	  easeInQuad: function (t) { return t*t },
	  easeOutQuad: function (t) { return t*(2-t) },
	  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
	  easeInCubic: function (t) { return t*t*t },
	  easeOutCubic: function (t) { return (--t)*t*t+1 },
	  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
	  easeInQuart: function (t) { return t*t*t*t },
	  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
	  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
	  easeInQuint: function (t) { return t*t*t*t*t },
	  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
	  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
	}
	
	this.construct = function(options){
		root.init(options);
	}

	this.init = function(options){
		$.extend(vars , options);
		$container = $(vars.container);
		countTo=vars.frames;
		
		iconSelector.on(vars.event,function(event){
			direction=(direction==-1)?(1):(-1);
			var arrClass=$(this).attr('class').split(' ');
			root.selectClass(arrClass);
			root.toggle(framesCounted, this);
		});
	}
	
	this.destroy = function() {
		iconSelector.off(vars.event);
	}
	
	 this.checkElementsClass = function( elem ) {
		var res = -1;
		var find_icon=[].concat( elem.split('-') );		
		var icon_name='';
		if (find_icon instanceof Array && find_icon.length>1 && find_icon[0]==icon_prefix) {
			icon_name = find_icon[1];
			if ( icon_name.length>0 ) res = iconClasses.indexOf(icon_name);
			if ( res>=0 ) className = icon_prefix + '-' + icon_name + '-';
		}	
	 }
	 
	 this.selectClass = function( arrClass ) {
		arrClass.forEach( root.checkElementsClass );
	 }
	
	this.toggle = function(count, container) {
	   //var direction = framesCounted<countTo;
	   var $container = $(container);
	   clearTimeout(timeout);
	   (function step() {
		easing = EasingFunctions.easeOutQuad(count);
		//easing = parseInt(Math.log(count)*Math.log(count)*10, 10);
		$container.removeClass (function (index, css) {
				var re = new RegExp("^|"+className+".*","gi"); 
				return (css.match (re) || []).join(' ');
			}).addClass(className+count);		
		framesCounted=count;
		if ( (direction==1 && count++ < countTo) || (direction==-1 && count-- > countFrom) ) {                      
		  timeout = setTimeout(step, interval-easing);               
		}	
	  })(); 
	}
	this.construct(options);
}

/*extensions*/

/* Production steps of ECMA-262, Edition 5, 15.4.4.18 */ 
/* Reference: http://es5.github.io/#x15.4.4.18 */
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function(callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError(' this is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError(callback + ' is not a function');
    }
    if (arguments.length > 1) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}
/* Production steps of ECMA-262, Edition 5, 15.4.4.14 */ 
/* Reference: http://es5.github.io/#x15.4.4.14 */
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function(searchElement, fromIndex) {
    var k;
    if (this == null) {
      throw new TypeError('"this" is null or not defined');
    }
    var O = Object(this);
    var len = O.length >>> 0;
    if (len === 0) {
      return -1;
    }
    var n = +fromIndex || 0;
    if (Math.abs(n) === Infinity) {
      n = 0;
    }
    if (n >= len) {
      return -1;
    }
    k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
    while (k < len) {
      var kValue;
      if (k in O && O[k] === searchElement) {
        return k;
      }
      k++;
    }
    return -1;
  };
}
