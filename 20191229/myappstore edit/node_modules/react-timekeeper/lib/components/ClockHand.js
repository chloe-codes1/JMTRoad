"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ClockHand;

var _core = require("@emotion/core");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _constants2 = require("./styles/constants");

var _math = require("../helpers/math");

function rotate(r) {
  return "rotate(".concat(r, " ").concat(_constants.CLOCK_RADIUS, " ").concat(_constants.CLOCK_RADIUS, ")");
}

function getAngle(mode, time) {
  var increments = _constants.CLOCK_VALUES[mode].increments;
  var value = (0, _utils.getTimeValue)(mode, time);
  return value * (360 / increments);
}

function ClockHand(_ref) {
  var mode = _ref.mode,
      time = _ref.time;
  var prevState = (0, _react.useRef)({
    time: time,
    mode: mode
  });
  var dragCount = (0, _react.useRef)(0); // clockhand positioning

  var inner = time.hour > 0 && time.hour <= 12;
  var handLength = (0, _constants.getClockHandLength)(mode, inner);
  var circlePosition = (0, _constants.getClockHandCirclePosition)(mode, inner);
  var circleRadius = (0, _constants.getClockHandCircleRadius)(mode, inner);

  var _useSpring = (0, _reactSpring.useSpring)(function () {
    return {
      immediate: true,
      rotation: getAngle(mode, time),
      length: handLength,
      position: circlePosition
    };
  }),
      _useSpring2 = (0, _slicedToArray2.default)(_useSpring, 2),
      anim = _useSpring2[0],
      setAnim = _useSpring2[1];

  var rotation = anim.rotation,
      length = anim.length,
      position = anim.position;
  (0, _react.useEffect)(function () {
    var current = rotation.value;
    var next = getAngle(mode, time);

    if (prevState.current.mode !== mode) {
      dragCount.current = 0;
      prevState.current.mode = mode; // mode changed, animate clockhand to next mode angle

      var finalAngle = (0, _math.calcAnimationAngle)(current, next);
      setAnim({
        immediate: false,
        rotation: finalAngle,
        length: handLength,
        position: circlePosition
      });
    } else if (!(0, _utils.isSameTime)(prevState.current.time, time)) {
      // time changed, no animation necessary - just update clockhand
      prevState.current.time = time;
      dragCount.current++;
      /*
      TODO - consider making this a config option?
      if on hour mode and `switchToMinuteOnHourSelect` is enabled, don't display
      change in time, just wait for mode to change
      */
      // if (isHourMode(mode) && config.switchToMinuteOnHourSelect && dragCount.current < 2) {
      // 	return
      // }

      setAnim({
        immediate: true,
        rotation: next,
        length: handLength,
        position: circlePosition
      });
    }
  }, [circlePosition, handLength, mode, rotation, setAnim, time]); // mini circle on clockhand between increments on minutes

  var value = (0, _utils.getTimeValue)(mode, time);
  var showIntermediateValueDisplay;

  if (mode === _constants.MODE.MINUTES && value % 5) {
    showIntermediateValueDisplay = (0, _core.jsx)("circle", {
      cx: _constants.CLOCK_RADIUS,
      cy: _constants.NUMBER_OUTER_POSITION,
      r: 4,
      fill: _constants2.CLOCK_HAND_INTERMEDIATE_CIRCLE_BACKGROUND,
      className: "react-timekeeper__hand-intermediate-circle"
    });
  }

  return (0, _core.jsx)("svg", {
    width: _constants.CLOCK_SIZE,
    height: _constants.CLOCK_SIZE,
    viewBox: "0 0 ".concat(_constants.CLOCK_SIZE, " ").concat(_constants.CLOCK_SIZE),
    xmlns: "http://www.w3.org/2000/svg",
    className: "react-timekeeper__clock-hand"
  }, (0, _core.jsx)(_reactSpring.animated.g, {
    transform: rotation.interpolate(function (a) {
      return rotate(a);
    })
  }, (0, _core.jsx)(_reactSpring.animated.line, {
    stroke: _constants2.CLOCK_HAND_ARM,
    x1: _constants.CLOCK_RADIUS,
    y1: _constants.CLOCK_RADIUS,
    x2: _constants.CLOCK_RADIUS,
    y2: length,
    strokeWidth: "1",
    className: "react-timekeeper__clock-hand"
  }), (0, _core.jsx)("circle", {
    cx: _constants.CLOCK_RADIUS,
    cy: _constants.CLOCK_RADIUS,
    r: 1.5,
    fill: _constants2.CLOCK_HAND_ARM,
    className: "react-timekeeper__hand-circle-center"
  }), (0, _core.jsx)(_reactSpring.animated.circle, {
    fill: _constants2.CLOCK_HAND_CIRCLE_BACKGROUND,
    cx: _constants.CLOCK_RADIUS,
    cy: position,
    r: circleRadius,
    className: "react-timekeeper__hand-circle-outer"
  }), showIntermediateValueDisplay));
}