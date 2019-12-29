"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MinuteNumbers = exports.HourNumbers = void 0;

var _core = require("@emotion/core");

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _constants = require("../helpers/constants");

var _math = require("../helpers/math");

var _numbers = require("./styles/numbers");

/*
	can memoize components since `anim` object doesn't actually change
*/
function hours(_ref) {
  var anim = _ref.anim,
      mode = _ref.mode,
      hour24Mode = _ref.hour24Mode;
  var opacity = anim.opacity,
      translate = anim.translate,
      translateInner = anim.translateInner;
  var _CLOCK_VALUES$mode = _constants.CLOCK_VALUES[mode],
      numbersOuter = _CLOCK_VALUES$mode.numbers,
      numbersInner = _CLOCK_VALUES$mode.numbersInner;
  return (0, _core.jsx)(_reactSpring.animated.div, {
    style: {
      opacity: opacity
    },
    css: _numbers.numbersWrapperStyle,
    className: "react-timekeeper__clock-hours"
  }, numbersOuter.map(function (val, i) {
    return (0, _core.jsx)(_reactSpring.animated.span, {
      css: (0, _numbers.numbersStyle)({
        hour24Mode: hour24Mode
      }),
      key: val,
      style: {
        transform: translate.interpolate(function (v) {
          return (0, _math.transform)(i + 1, v);
        })
      }
    }, val);
  }), hour24Mode && numbersInner.map(function (val, i) {
    return (0, _core.jsx)(_reactSpring.animated.span, {
      css: (0, _numbers.numbersStyle)({
        hour24Mode: hour24Mode,
        inner: true
      }),
      key: val,
      style: {
        transform: translateInner.interpolate(function (v) {
          return (0, _math.transform)(i + 1, v);
        })
      }
    }, val);
  }));
}

var HourNumbers = (0, _react.memo)(hours, function (prev, next) {
  return prev.mode === next.mode && prev.hour24Mode === next.hour24Mode;
});
exports.HourNumbers = HourNumbers;

function minutes(_ref2) {
  var anim = _ref2.anim;
  var opacity = anim.opacity,
      translate = anim.translate;
  return (0, _core.jsx)(_reactSpring.animated.div, {
    style: {
      opacity: opacity
    },
    css: _numbers.numbersWrapperStyle,
    className: "react-timekeeper__clock-minutes"
  }, _constants.MINUTES.map(function (val, i) {
    return (0, _core.jsx)(_reactSpring.animated.span, {
      css: (0, _numbers.numbersStyle)({}),
      key: val,
      style: {
        transform: translate.interpolate(function (v) {
          return (0, _math.transform)(i + 1, v);
        })
      }
    }, val);
  }));
}

var MinuteNumbers = (0, _react.memo)(minutes, function () {
  return true;
});
exports.MinuteNumbers = MinuteNumbers;