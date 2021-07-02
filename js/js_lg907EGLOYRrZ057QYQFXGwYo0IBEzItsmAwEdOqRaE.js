/*<![CDATA[*/
(function() {
var sz = document.createElement('script'); sz.type = 'text/javascript'; sz.async = true;
sz.src = '//siteimproveanalytics.com/js/siteanalyze_6168367.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(sz, s);
})();
;
/**
 * Akrediteerimise vormi JS.
 */
(function($) {
  /* Participation checkboxes update amount and labels .*/
  var partInfoItems = $('.field-name-field-event-part-info').find('> .field-items > .field-item');
  var partInfoCount = partInfoItems.length;
  if (partInfoCount == 1) {
    $($('.field-name-field-event-part-2').find('input[type=checkbox]')[0]).prop('checked', true);
    $('.field-name-field-event-part-2').hide();
  } else {
    var partInfoCheckboxes = $('#edit-field-event-part-2-und').find('.form-item');
    partInfoCheckboxes.each(function(index, checkbox) {
      if ((index + 1) > partInfoCount) {
        $(checkbox).remove();
      } else {
        var label = $(partInfoItems[index]).find('.field-name-field-pealkiri > .field-items > .field-item').text();
        $(checkbox).find('.option').text(label);
      }
    });
  }

  /* Set same height to blocks */
  var leftHeight = $('.node-event').find('> .group-left').height();
  var rightHeight = $('.node-event').find('> .group-right').height();
  if(leftHeight > rightHeight) {
    $('.node-event').find('> .group-right').height(leftHeight);
    $('.node-event').find('> .group-left').height(leftHeight);
  } else {
     $('.node-event').find('> .group-left').height(rightHeight);
     $('.node-event').find('> .group-right').height(rightHeight);
  }

    /** if redirected from another page
  *    -open tab with containing ID
 */

var scrollUrl = window.location.href;
var scrollContains = scrollUrl.indexOf('#');

if ($('#static-module-5').is(':visible') && scrollContains !== -1) {

  var id = scrollUrl.substring(scrollUrl.lastIndexOf('#'));

  $(document).ready(function () {

    $targetId = $(id);
    $slides = $('.slide');
    $tabs = $('.tab');
    
    $slides.each(function (i) {
      if ($(this).find(id).length !== 0) {
        $tabs.removeClass('active');
        $tabs[i].classList = 'active';
        $slides.hide();
        $slides.eq(i).show();
      }
    });
    $targetId.scrollTop(100);
  });  
 }

  /* end of redirect */

})(jQuery);
;
/*!
 * imagesLoaded PACKAGED v3.0.2
 * JavaScript is all like "You images are done yet or what?"
 */

/*!
 * EventEmitter v4.1.0 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function (exports) {
	// Place the script in strict mode
	'use strict';

	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class Manages event registering and emitting.
	 */
	function EventEmitter() {}

	// Shortcuts to improve speed and size

	// Easy access to the prototype
	var proto = EventEmitter.prototype,
		nativeIndexOf = Array.prototype.indexOf ? true : false;

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function} listener Method to look for.
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listener, listeners) {
		// Return the index via the native method if possible
		if (nativeIndexOf) {
			return listeners.indexOf(listener);
		}

		// There is no native method
		// Use a manual loop to find the index
		var i = listeners.length;
		while (i--) {
			// If the listener matches, return it's index
			if (listeners[i] === listener) {
				return i;
			}
		}

		// Default to returning -1
		return -1;
	}

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function () {
		return this._events || (this._events = {});
	};

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function (evt) {
		// Create a shortcut to the storage object
		// Initialise it if it does not exists yet
		var events = this._getEvents(),
			response,
			key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (typeof evt === 'object') {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function (evt) {
		var listeners = this.getListeners(evt),
			response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function (evt, listener) {
		var listeners = this.getListenersAsObject(evt),
			key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) &&
				indexOfListener(listener, listeners[key]) === -1) {
				listeners[key].push(listener);
			}
		}

		// Return the instance of EventEmitter to allow chaining
		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = proto.addListener;

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function (evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function (evts)
	{
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function (evt, listener) {
		var listeners = this.getListenersAsObject(evt),
			index,
			key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listener, listeners[key]);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		// Return the instance of EventEmitter to allow chaining
		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = proto.removeListener;

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function (evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function (evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function (remove, evt, listeners) {
		// Initialise any required variables
		var i,
			value,
			single = remove ? this.removeListener : this.addListener,
			multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		// Return the instance of EventEmitter to allow chaining
		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function (evt) {
		var type = typeof evt,
			events = this._getEvents(),
			key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (type === 'object') {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		// Return the instance of EventEmitter to allow chaining
		return this;
	};

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function (evt, args) {
		var listeners = this.getListenersAsObject(evt),
			i,
			key,
			response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					response = args ? listeners[key][i].apply(null, args) : listeners[key][i]();
					if (response === true) {
						this.removeListener(evt, listeners[key][i]);
					}
				}
			}
		}

		// Return the instance of EventEmitter to allow chaining
		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = proto.emitEvent;

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function (evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	// Expose the class either via AMD or the global object
	if (typeof define === 'function' && define.amd) {
		define(function () {
			return EventEmitter;
		});
	}
	else {
		exports.EventEmitter = EventEmitter;
	}
}(this));
/*!
 * eventie v1.0.3
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

( function( window ) {

'use strict';

var docElem = document.documentElement;

var bind = function() {};

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = window.event;
        // add event.target
        event.target = event.target || event.srcElement;
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = window.event;
        // add event.target
        event.target = event.target || event.srcElement;
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( eventie );
} else {
  // browser global
  window.eventie = eventie;
}

})( this );

/*!
 * imagesLoaded v3.0.2
 * JavaScript is all like "You images are done yet or what?"
 */

( function( window ) {

'use strict';

var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

// --------------------------  -------------------------- //

function defineImagesLoaded( EventEmitter, eventie ) {

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ImagesLoaded ) ) {
      return new ImagesLoaded( elem, options );
    }
    // use elem as selector string
    if ( typeof elem === 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options === 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ($ instanceof jQuery) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ImagesLoaded.prototype = new EventEmitter();

  ImagesLoaded.prototype.options = {};

  ImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0, len = this.elements.length; i < len; i++ ) {
      var elem = this.elements[i];
      // filter siblings
      if ( elem.nodeName === 'IMG' ) {
        this.addImage( elem );
      }
      // find children
      var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        var img = childElems[j];
        this.addImage( img );
      }
    }
  };

  /**
   * @param {Image} img
   */
  ImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ImagesLoaded.prototype.check = function() {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !length ) {
      this.complete();
      return;
    }

    function onConfirm( image, message ) {
      if ( _this.options.debug && hasConsole ) {
        console.log( 'confirm', image, message );
      }

      _this.progress( image );
      checkedCount++;
      if ( checkedCount === length ) {
        _this.complete();
      }
      return true; // bind once
    }

    for ( var i=0; i < length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.on( 'confirm', onConfirm );
      loadingImage.check();
    }
  };

  ImagesLoaded.prototype.progress = function( image ) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    this.emit( 'progress', this, image );
    if ( this.jqDeferred ) {
      this.jqDeferred.notify( this, image );
    }
  };

  ImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    this.emit( eventName, this );
    this.emit( 'always', this );
    if ( this.jqDeferred ) {
      var jqMethod = this.hasAnyBroken ? 'reject' : 'resolve';
      this.jqDeferred[ jqMethod ]( this );
    }
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
    $.fn.imagesLoaded = function( options, callback ) {
      var instance = new ImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  }


  // --------------------------  -------------------------- //

  var cache = {};

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new EventEmitter();

  LoadingImage.prototype.check = function() {
    // first check cached any previous images that have same src
    var cached = cache[ this.img.src ];
    if ( cached ) {
      this.useCached( cached );
      return;
    }
    // add this to cache
    cache[ this.img.src ] = this;

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var proxyImage = this.proxyImage = new Image();
    eventie.bind( proxyImage, 'load', this );
    eventie.bind( proxyImage, 'error', this );
    proxyImage.src = this.img.src;
  };

  LoadingImage.prototype.useCached = function( cached ) {
    if ( cached.isConfirmed ) {
      this.confirm( cached.isLoaded, 'cached was confirmed' );
    } else {
      var _this = this;
      cached.on( 'confirm', function( image ) {
        _this.confirm( image.isLoaded, 'cache emitted confirmed' );
        return true; // bind once
      });
    }
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  // trigger specified handler for event type
  LoadingImage.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  LoadingImage.prototype.onload = function() {
    this.confirm( true, 'onload' );
    this.unbindProxyEvents();
  };

  LoadingImage.prototype.onerror = function() {
    this.confirm( false, 'onerror' );
    this.unbindProxyEvents();
  };

  LoadingImage.prototype.unbindProxyEvents = function() {
    eventie.unbind( this.proxyImage, 'load', this );
    eventie.unbind( this.proxyImage, 'error', this );
  };

  // -----  ----- //

  return ImagesLoaded;
}

// -------------------------- transport -------------------------- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [
      'eventEmitter',
      'eventie'
    ],
    defineImagesLoaded );
} else {
  // browser global
  window.imagesLoaded = defineImagesLoaded(
    window.EventEmitter,
    window.eventie
  );
}

})( window );
;
(function($) {
  var
    $l2menus = $('#block-vp-menu-second-level-menu-content-content > div'),
    $l1menu = $('#zone-header div.block-main-menu .menu-block-wrapper > ul.menu'),
    $l1menulinks = $l1menu.find('> li > a'),
    // For sliding down active menu in _vPMenuToggleActiveMenu().
    $sectionContent = $('#section-content'),
    $originaPaddingOfSectionContent = $sectionContent.css('padding-top'),
    noneActiveMenuPopupVisible = false,
    activeMenuPopupVisible = false,
    animateSpeedSlide = 0,
    $lastActiveL1MenuItem,
    $breadCrumbLinks = $('#block-delta-blocks-breadcrumb a');

  jQuery.fn.vpMenuEqualHeight = function() {
    var $el = $(this);

    var equalize = function() {
      var colsHighest = 0;

      $el.attr('style', '').each(function() {
        var height = $(this).height();
        if (height > colsHighest) {
          colsHighest = height;
        }
      });

      $el.css('min-height', colsHighest);
    };

    equalize();

    imagesLoaded($el, function() {
      equalize();
    });
  };

  // Move menu popups out of the module and move to correct position in DOM.
  $l2menus.prependTo('#section-content');

  // Remove empty paragraph that the editor includes into every document.
  $l2menus.find('> p').remove();

  // Temporary solution (should be done with PHP): add active class to submenu.
  $('#zone-header ul.menu li.active-trail').each(function() {
    var id = $(this).attr('id');
    var $activeMenuPopup = $l2menus.filter('.' + id).addClass('active');

    // Set arrow for active menu item.
    var _vpMenuSetMenuPosition = function() {
      var $menuL1ItemActive = $l1menulinks.filter('.active-trail');
      var l1menuLeft = $menuL1ItemActive.closest('.block').position().left + $menuL1ItemActive.position().left + parseInt($menuL1ItemActive.css('padding-left')) /* If has-separator class is set, there's also padding-left bigger than 0. */ + $menuL1ItemActive.width()/2 - 15/* half of arrow */ + 10/* left menu side overflow relative to content */;
      $activeMenuPopup.find('.arrow').css('left', l1menuLeft);
    };

    // Disable tabindex for hidden active menu.
    $activeMenuPopup.find('a').attr('tabindex', '-1');

    _vpMenuSetMenuPosition();

    // Custom fonts loaded.
    $(window).load(function() {
      _vpMenuSetMenuPosition();
    });
  });

  // Add equal columns to menu that is previewed in content area.
  if ($('body').hasClass('logged-in')) {
    $('#zone-content div.static-mainmenu-popup').each(function() {
      $(this).find('div.container-12').eq(0).find(' > div').vpMenuEqualHeight();
    });
  }

  /**
   * Set events.
   *
   * Capsulate variables by menu items.
   */
  $l1menulinks.on('click touchstart', function(e) { l1menulinksEvent(this, e); });
  $('body').on('click touchstart', function() { closeAll(); });
  $l2menus.on('click touchstart', function(e) { e.stopPropagation(); });

  $breadCrumbLinks.click(function(e) {
    var $breadCrumbsLink = $(this);

    $l1menulinks.each(function() {
      if (!$(this).hasClass('hide-for-desktop') && $(this).attr('href') === $breadCrumbsLink.attr('href')) {
        l1menulinksEvent(this, e);
        e.preventDefault();
      }
    });
  });

  var l1menulinksEvent = function(that, e) {

    // Kui menu link on klassiga "otselink", siis mine otse sinna. mm.
    if (that.className.indexOf('otselink') != -1) {
      return;
    }

    if (e.type === 'keydown' && e.keyCode !== 13) {
      return true;
    }

    var $this = $(that);
    var id = $this.parent().attr('id');
    var $menu = $('#menu-l2-popup-' + id);

    closeAll();

    if ($this.hasClass('active-trail')) {
      _vPMenuToggleActiveMenu($menu, 'open');
    } else {
      _vPMenuToggleMenu($menu, $this, 'open');
    }

    if (e.type === 'keydown' && e.keyCode === 13) {
      $lastActiveL1MenuItem = $this;
      _vPMenuApplyAccessibiliy($menu);
    }

    var $widget_slider = $menu.find('.widget-slider');
    if ($widget_slider.is(':visible')) {
      $widget_slider.once().flexslider({
        controlNav: true,
        directionNav: false,
        animation: 'slide',
        direction: 'horizontal'
      });
    }

    e.stopPropagation();
    e.preventDefault();
  };

  // Close the menus if escape is used.
  $('body').keydown(function(e) {
    if ((activeMenuPopupVisible || noneActiveMenuPopupVisible) && e.keyCode === 27) {
      closeAll();
      $lastActiveL1MenuItem.focus();
    }
  });

  var closeAll = function() {
    if (noneActiveMenuPopupVisible === false && activeMenuPopupVisible === false) {
      return false;
    }
    _vPMenuToggleMenu($l2menus.not('.active'), false, 'close');
    _vPMenuToggleActiveMenu($l2menus.filter('.active'), 'close');
  };

  /**
   * Set timeouts for setTimeout() function.
   *
   * forceLongDelay parameter forces 300ms.
   */
  var timeoutBeforeAct = function(forceLongDelay) {
    var shortDelay = 80;
    var longDelay = 300;

    if (typeof forceLongDelay === 'undefined') {
      forceLongDelay = false;
    }

    if (noneActiveMenuPopupVisible && forceLongDelay === false) {
      // Little delay seems better than 0.
      return shortDelay;
    } else {
      return longDelay;
    }
  };

  /**
   * Hide/show unactive menu according to action parameter.
   */
  var _vPMenuToggleMenu = function($menu, $menuL1Item, action) {
    if (action === 'close') {
      noneActiveMenuPopupVisible = false;
      hideOverlay();
      // @todo remove callback and time if 0 will be set.
      $menu.not('.active').hide(0, function() {
        $menu.not('.active').find('.arrow').hide();
      });
    } else if (action === 'open') {
      noneActiveMenuPopupVisible = true;
      showOverlay();
      // @todo remove callback and time if 0 will be set.
      $menu.show(0, function() {
        var $this = $(this);
        $this.find('div.container-12').eq(0).find(' > div').vpMenuEqualHeight();
        if ($menuL1Item !== false) {
          var arrowLeft = $menuL1Item.closest('.block').position().left + $menuL1Item.position().left + parseInt($menuL1Item.css('padding-left')) /* If has-separator class is set, there's also padding-left bigger than 0. */ + $menuL1Item.width()/2 - 15/* half of arrow */ + 10/* left menu side overflow relative to content */;
          $menu.find('.arrow').css('left', arrowLeft).show();
        }
      });

    }
  };

  /**
   * Hide/show active menu according to action parameter.
   *
   * @todo: I'll disable close for now on active menu as there is too much sliding going on.
   */
  var _vPMenuToggleActiveMenu = function($menu, action) {
    if (action === 'close') {
      var newPaddingTop = $originaPaddingOfSectionContent;
      // Disable tabindex for hidden active menu.
      $menu.find('a').attr('tabindex', '-1');
    } else if (action === 'open') {
      activeMenuPopupVisible = true;
      var newPaddingTop = $menu.height() - 29 - 25;
      // Enable tabindex for shown active menu.
      $menu.find('a').attr('tabindex', '');
    }

    // Wrong event trigger. Quit.
    if (typeof newPaddingTop === 'undefined') {
      return false
    }

    $sectionContent.animate({
      paddingTop: newPaddingTop
    }, animateSpeedSlide, function() {
      if (action === 'open') {
        $menu.find('div.container-12').eq(0).find(' > div').vpMenuEqualHeight();
      }
    });

  };

  /**
   * Show overlay for unactive menus.
   */
  var showOverlay = function() {
    var $overlay = $('#menu-l2-popup-overlay');
    if ($overlay.length === 0) {
      $overlay = $('<div id="menu-l2-popup-overlay"></div>').appendTo('body');
    }
    var top = $('#section-header').offset().top + $('#section-header').height() - 9;
    $overlay.css({
      top: top,
      height: $(document).height() - top
    })
    .show();
  };

  /**
   * Hide overlay for unactive menus.
   */
  var hideOverlay = function() {
    $('#menu-l2-popup-overlay').hide();
  };

  /**
   * Create skip link and loop inside the menu popup.
   */
  var _vPMenuApplyAccessibiliy = function($menu) {
    var $skipLinkWrapper = $menu.find('.vp-menu-skip-link');
    if ($skipLinkWrapper.length === 0) {
      $skipLinkWrapper = $('<div class="vp-menu-skip-link"><a href="#" class="element-invisible element-focusable">' + Drupal.t('Exit submenu') + '</a></div>');
      $skipLinkWrapper.prependTo($menu.find('.mainmenu-popup-content'));
      // Add dummy link so that we can create loop with tab index inside the menu popup.
      $('<a href="#" class="element-invisible element-focusable"></a>').appendTo($menu.find('.mainmenu-popup-content'));
    }

    $skipLinkWrapper.find('a').click(function(e) {
      $lastActiveL1MenuItem.focus();
      closeAll();
      e.preventDefault();
    });

    // Create loop inside the menu popup.
    $aElements = $menu.find('a');
    $aElements.eq(0).focus();
    $aElements.eq($aElements.length-1).unbind('focus').bind('focus', function() {
      $aElements.eq(0).focus();
    });
  }

})(jQuery);
;
/**
 * @file
 * Template Custom - Read More width icon.
 *
 * Add read more if there are more than 1 paragraphs.
 */

(function($) {
  $('DIV.template-custom-infoblock-with-icon__content-content').each(function() {
    var $this = $(this),
        $children = $this.find('> *');

    if ($children.length > 1) {
      $children.hide().css('margin-bottom', 0);
      $children.eq(0).show();
      $children.eq(0).append(' <a class="template-custom-infoblock-with-icon__icon_read-more" href="#">' + Drupal.t('Read more') + '</a>');
    }

    $('A.template-custom-infoblock-with-icon__icon_read-more').click(function(e) {
      e.preventDefault();
      var $this = $(this);
      $this.parent().attr('style', '');
      $this.parent().siblings().show().attr('style', '');
      $this.remove();
    });
  });
})(jQuery);
;
(function($) {
  var isNodeTypeNews = $('body.node-type-news').length === 1 ? true : false;

  $('.node img').each(function() {
    var $this = $(this),
        longdesc = $this.attr('longdesc'),
        style,
        styleFloat,
        $wrap;

    // Don't do anything if it's the news cover image.
    if (isNodeTypeNews) {
      if ($this.closest('.field-name-field-cover-image').length) {
        return false;
      }
    }

    style = $this.attr('style');
    styleFloat = $this.css('float');

    $this.attr('style', '');

    if ($this.parent().get(0).tagName === 'A') {
      $this = $this.parent();
    }

    $this.wrap('<span class="image"><span class="image-inner"></span></span>');

    $wrap = $this.parent().parent();

    if (styleFloat == 'left') {
      $wrap.addClass('float-left');
    } else if (styleFloat == 'right') {
      $wrap.addClass('float-right');
    }

    $wrap.attr('style', style);
    $wrap.css('height', 'auto');
    if (typeof longdesc !== 'undefined') {
      $this.after('<span class="caption">' + longdesc + '</span>');
    }
  });

})(jQuery);
;
