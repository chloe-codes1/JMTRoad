"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFontSize = getFontSize;
exports.getOuterNumberPosition = getOuterNumberPosition;
exports.getClockHandLength = getClockHandLength;
exports.getClockHandCirclePosition = getClockHandCirclePosition;
exports.getClockHandCircleRadius = getClockHandCircleRadius;
exports.INNER_NUMBER_POSITIONING = exports.INITIAL_MINUTE_TRANSFORM = exports.INITIAL_HOUR_TRANSFORM = exports.NUMBER_OUTER_POSITION = exports.NUMBER_RADIUS_REGULAR = exports.INNER_NUMBER_RADIUS = exports.CLOCK_SIZE = exports.CLOCK_RADIUS = exports.VISIBLE_NUMBERS_PER_CIRCLE = exports.CLOCK_VALUES = exports.MERIDIEM = exports.MODE = exports.MINUTES = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _CLOCK_VALUES;

var MINUTES = ['05', 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, '00'].map(function (a) {
  return a.toString();
});
exports.MINUTES = MINUTES;
var MINUTES_60 = Array.from(Array(60), function (_, i) {
  return i.toString();
});
var HOURS_12 = Array.from(Array(12), function (_, i) {
  return (i + 1).toString();
});
var HOURS_24 = Array.from(Array(23), function (_, i) {
  return (i + 1).toString();
}).concat('00');
var MODE;
exports.MODE = MODE;

(function (MODE) {
  MODE["MINUTES"] = "MINUTES";
  MODE["HOURS_12"] = "HOURS_12";
  MODE["HOURS_24"] = "HOURS_24";
})(MODE || (exports.MODE = MODE = {}));

var MERIDIEM;
/*
	- increments is how many splits on clock, visible or invisible
*/

exports.MERIDIEM = MERIDIEM;

(function (MERIDIEM) {
  MERIDIEM["am"] = "am";
  MERIDIEM["pm"] = "pm";
})(MERIDIEM || (exports.MERIDIEM = MERIDIEM = {}));

var CLOCK_VALUES = (_CLOCK_VALUES = {}, (0, _defineProperty2.default)(_CLOCK_VALUES, MODE.MINUTES, {
  increments: 60,
  numbers: MINUTES,
  dropdown: MINUTES_60
}), (0, _defineProperty2.default)(_CLOCK_VALUES, MODE.HOURS_12, {
  increments: 12,
  numbers: HOURS_12,
  dropdown: HOURS_12
}), (0, _defineProperty2.default)(_CLOCK_VALUES, MODE.HOURS_24, {
  increments: 12,
  numbers: HOURS_24.slice(12),
  numbersInner: HOURS_24.slice(0, 12),
  dropdown: HOURS_24
}), _CLOCK_VALUES); // number of actual numbers to display

exports.CLOCK_VALUES = CLOCK_VALUES;
var VISIBLE_NUMBERS_PER_CIRCLE = 12; // radius of clock, in px

exports.VISIBLE_NUMBERS_PER_CIRCLE = VISIBLE_NUMBERS_PER_CIRCLE;
var CLOCK_RADIUS = 110;
exports.CLOCK_RADIUS = CLOCK_RADIUS;
var CLOCK_SIZE = CLOCK_RADIUS * 2;
/*
	radius of invisible inner circle for 24 hour numbers
	- controls how far out the inner circle comes and
	how far in numbers come as well
 */

exports.CLOCK_SIZE = CLOCK_SIZE;
var INNER_NUMBER_RADIUS = 77; // font sizes

exports.INNER_NUMBER_RADIUS = INNER_NUMBER_RADIUS;
var NUMBER_REGULAR_FONT_SIZE = 16;
var HOUR_24_INNER_FONT_SIZE = 15;
var HOUR_24_OUTER_FONT_SIZE = 13;

function getFontSize(hour24Mode, inner) {
  if (!hour24Mode) {
    return NUMBER_REGULAR_FONT_SIZE;
  }

  return inner ? HOUR_24_INNER_FONT_SIZE : HOUR_24_OUTER_FONT_SIZE;
} // size of circle surrounding individual numbers
// loosely based on font sizes above


var NUMBER_RADIUS_REGULAR = 34;
exports.NUMBER_RADIUS_REGULAR = NUMBER_RADIUS_REGULAR;
var NUMBER_RADIUS_HOUR_24_OUTER = 32;
var NUMBER_RADIUS_HOUR_24_INNER = 28; // positioning of numbers

var NUMBER_OUTER_POSITION = 22;
exports.NUMBER_OUTER_POSITION = NUMBER_OUTER_POSITION;
var NUMBER_OUTER_POSITION_24_HOUR = 18; // controls how far out to move numbers during 24h mode

var NUMBER_INNER_POSITION_24_HOUR = CLOCK_RADIUS - INNER_NUMBER_RADIUS + NUMBER_RADIUS_HOUR_24_INNER / 2;

function getOuterNumberPosition(mode) {
  return mode === MODE.HOURS_24 ? NUMBER_OUTER_POSITION_24_HOUR : NUMBER_OUTER_POSITION;
} // initial position of hours/minutes before animating to final position


var INITIAL_HOUR_TRANSFORM = NUMBER_OUTER_POSITION - 32;
exports.INITIAL_HOUR_TRANSFORM = INITIAL_HOUR_TRANSFORM;
var INITIAL_MINUTE_TRANSFORM = NUMBER_OUTER_POSITION + 28; // clock hand stuff

exports.INITIAL_MINUTE_TRANSFORM = INITIAL_MINUTE_TRANSFORM;

function getClockHandLength(mode, inner) {
  if (mode !== MODE.HOURS_24) {
    return NUMBER_OUTER_POSITION;
  }

  return inner ? NUMBER_INNER_POSITION_24_HOUR : NUMBER_OUTER_POSITION_24_HOUR;
}

function getClockHandCirclePosition(mode, inner) {
  if (mode !== MODE.HOURS_24) {
    return NUMBER_OUTER_POSITION;
  }

  return inner ? NUMBER_INNER_POSITION_24_HOUR : NUMBER_OUTER_POSITION_24_HOUR;
}

function getClockHandCircleRadius(mode, inner) {
  if (mode !== MODE.HOURS_24) {
    return NUMBER_RADIUS_REGULAR / 2;
  }

  return inner ? NUMBER_RADIUS_HOUR_24_INNER / 2 : NUMBER_RADIUS_HOUR_24_OUTER / 2;
}

var animationChange = 22;
var INNER_NUMBER_POSITIONING = {
  exit: NUMBER_INNER_POSITION_24_HOUR + animationChange,
  enter: NUMBER_INNER_POSITION_24_HOUR
};
exports.INNER_NUMBER_POSITIONING = INNER_NUMBER_POSITIONING;