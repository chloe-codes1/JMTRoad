"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useClockEvents;

var _react = require("react");

var _constants = require("../helpers/constants");

var _dom = require("../helpers/dom");

var _math = require("../helpers/math");

var atan2 = Math.atan2;

/*
	solely responsible for transforming click events into
	angles (which are later converted into time depending
	on current mode and other restrictions)
*/
function useClockEvents(clock, handleChange) {
  var wrapper = (0, _react.useRef)(null);
  var calcOffsetCache = (0, _react.useRef)(null);
  var dragCount = (0, _react.useRef)(0);
  var cleanup = (0, _react.useCallback)(_removeHandlers, []);
  var disableMouse = (0, _react.useRef)(false); // mouse events

  function handleMouseDown(e) {
    if (disableMouse.current) {
      return;
    }

    dragCount.current = 0; // add listeners

    document.addEventListener('mousemove', handleMouseDrag, false);
    document.addEventListener('mouseup', handleStopDrag, false);
    wrapper.current && wrapper.current.addEventListener('mouseleave', handleStopDrag, false);

    if (clock.current) {
      calcOffsetCache.current = (0, _dom.calcOffset)(clock.current);
    } // move hand


    handleMouseDrag(e); // TODO - fix ts
  }

  function handleMouseDrag(e) {
    if (calcOffsetCache.current) {
      var _calcOffsetCache$curr = calcOffsetCache.current(e.clientX, e.clientY),
          offsetX = _calcOffsetCache$curr.offsetX,
          offsetY = _calcOffsetCache$curr.offsetY;

      calculatePoint(offsetX, offsetY, false);
    }

    dragCount.current++;

    if (dragCount.current === 1 && clock.current) {
      clock.current.style.cursor = '-webkit-grabbing';
      clock.current.style.cursor = 'grabbing';
    }

    e.preventDefault();
    return false;
  } // touch events


  function handleTouchStart() {
    // disables mouse events during touch events
    disableMouse.current = true;
    dragCount.current = 0; // add listeners

    document.addEventListener('touchmove', touchDragHandler, false);
    document.addEventListener('touchend', handleStopDrag, false);
    document.addEventListener('touchcancel', handleStopDrag, false);

    if (clock.current) {
      calcOffsetCache.current = (0, _dom.calcOffset)(clock.current);
    }
  }

  function touchDragHandler(e) {
    if (calcOffsetCache.current) {
      var touch = e.targetTouches[0];

      var _calcOffsetCache$curr2 = calcOffsetCache.current(touch.clientX, touch.clientY),
          offsetX = _calcOffsetCache$curr2.offsetX,
          offsetY = _calcOffsetCache$curr2.offsetY;

      calculatePoint(offsetX, offsetY, false);
    }

    dragCount.current++;
    e.preventDefault();
    return false;
  } // stop mouse + touch events


  function handleStopDrag(e) {
    _removeHandlers();

    if (e == null || clock.current == null) {
      return;
    }

    if (isMouseEventEnd(e)) {
      _handleMouseUp(e);
    } else if (isTouchEventEnd(e)) {
      _handleTouchEnd(e);
    }

    function isMouseEventEnd(e) {
      return e.type === 'mouseup';
    }

    function isTouchEventEnd(e) {
      return e.type === 'touchcancel' || e.type === 'touchend';
    }
  }

  function _removeHandlers() {
    document.removeEventListener('mousemove', handleMouseDrag, false);
    document.removeEventListener('mouseup', handleStopDrag, false);
    wrapper.current && wrapper.current.removeEventListener('mouseleave', handleStopDrag, false);
    document.removeEventListener('touchmove', touchDragHandler, false);
    document.removeEventListener('touchend', handleStopDrag, false);
    document.removeEventListener('touchcancel', handleStopDrag, false);
  } // handle mouse + touch changes


  function _handleMouseUp(e) {
    if (!clock.current) {
      return;
    }

    clock.current.style.cursor = '';

    var _ref = calcOffsetCache.current(e.clientX, e.clientY),
        offsetX = _ref.offsetX,
        offsetY = _ref.offsetY;

    calculatePoint(offsetX, offsetY, true);
  }

  function _handleTouchEnd(e) {
    var touch = e.targetTouches[0] || e.changedTouches[0];

    if (touch && calcOffsetCache.current) {
      var _calcOffsetCache$curr3 = calcOffsetCache.current(touch.clientX, touch.clientY),
          offsetX = _calcOffsetCache$curr3.offsetX,
          offsetY = _calcOffsetCache$curr3.offsetY;

      calculatePoint(offsetX, offsetY, true);
    }

    setTimeout(function () {
      disableMouse.current = false;
    }, 10);
  }

  function calculatePoint(offsetX, offsetY, // determines if change is due to mouseup/touchend in order to
  // automatically change unit (eg: hour -> minute) if enabled
  // prevents changing unit if dragging along clock
  canAutoChangeUnit) {
    // if user just clicks/taps a number (drag count < 2), then just assume it's a rough tap
    // and force a rounded/coarse number (ie: 1, 2, 3, 4 is tapped, assume 0 or 5)
    var wasTapped = dragCount.current < 2;
    var x = offsetX - _constants.CLOCK_RADIUS;
    var y = -offsetY + _constants.CLOCK_RADIUS;
    var a = atan2(y, x);
    var d = 90 - (0, _math.deg)(a);

    if (d < 0) {
      d = 360 + d;
    } // ensure touch doesn't bleed outside of clock radius


    if (!(0, _math.isWithinRadius)(x, y, _constants.CLOCK_RADIUS) && wasTapped) {
      return false;
    }

    var isInnerClick = (0, _math.isWithinRadius)(x, y, _constants.INNER_NUMBER_RADIUS); // update time on main

    handleChange(d, {
      canAutoChangeUnit: canAutoChangeUnit,
      wasTapped: wasTapped,
      isInnerClick: isInnerClick
    });
  } // clean up


  (0, _react.useEffect)(function () {
    return cleanup;
  }, [cleanup]);
  return {
    bind: {
      onMouseDown: handleMouseDown,
      onTouchStart: handleTouchStart,
      ref: wrapper
    }
  };
}