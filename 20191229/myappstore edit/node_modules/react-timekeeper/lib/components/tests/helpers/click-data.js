"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MINUTE_59 = exports.MINUTE_23 = exports.MINUTE_7 = exports.HOUR_12_INNER = exports.HOUR_24_OUTER = exports.HOUR_3_INNER = exports.HOUR_3_OUTER = void 0;

var _constants = require("../../../helpers/constants");

/*
	angles are based on top left:
	so 3pm is
		x = clock_radius + clock_radius
		y = clock_radius
*/

/*
	TODO - make function to convert minutes/hours to coords
	otherwise changing CLOCK_RADIUS will end up breaking coords
*/
var HOUR_3_OUTER = {
  clientX: _constants.CLOCK_RADIUS * 2 - 1,
  clientY: _constants.CLOCK_RADIUS
};
exports.HOUR_3_OUTER = HOUR_3_OUTER;
var HOUR_3_INNER = {
  clientX: _constants.CLOCK_RADIUS + 1,
  clientY: _constants.CLOCK_RADIUS
};
exports.HOUR_3_INNER = HOUR_3_INNER;
var HOUR_24_OUTER = {
  clientX: _constants.CLOCK_RADIUS,
  clientY: 1
};
exports.HOUR_24_OUTER = HOUR_24_OUTER;
var HOUR_12_INNER = {
  clientX: _constants.CLOCK_RADIUS,
  clientY: _constants.CLOCK_RADIUS - 1
};
exports.HOUR_12_INNER = HOUR_12_INNER;
var MINUTE_7 = {
  clientX: _constants.CLOCK_RADIUS + 45,
  clientY: _constants.CLOCK_RADIUS / 2
};
exports.MINUTE_7 = MINUTE_7;
var MINUTE_23 = {
  clientX: _constants.CLOCK_RADIUS + 60,
  clientY: _constants.CLOCK_RADIUS + 60
};
exports.MINUTE_23 = MINUTE_23;
var MINUTE_59 = {
  clientX: _constants.CLOCK_RADIUS - 2,
  clientY: 1
};
exports.MINUTE_59 = MINUTE_59;