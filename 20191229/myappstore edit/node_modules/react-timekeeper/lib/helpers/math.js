"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deg = deg;
exports.transform = transform;
exports.isWithinRadius = isWithinRadius;
exports.calcAnimationAngle = calcAnimationAngle;

var _constants = require("./constants");

var cos = Math.cos,
    sin = Math.sin;
var pi = Math.PI;
var ANGLE_PER_INCREMENT = 360 / _constants.VISIBLE_NUMBERS_PER_CIRCLE;

function rad(deg) {
  return deg / (180 / pi);
}

function deg(rad) {
  return rad * (180 / pi);
} // translate number position


function translateX(index, transform) {
  return sin(rad(index * -ANGLE_PER_INCREMENT - 180)) * (_constants.CLOCK_RADIUS - transform) + _constants.CLOCK_RADIUS - _constants.NUMBER_RADIUS_REGULAR / 2;
}

function translateY(index, transform) {
  return cos(rad(index * -ANGLE_PER_INCREMENT - 180)) * (_constants.CLOCK_RADIUS - transform) + _constants.CLOCK_RADIUS - _constants.NUMBER_RADIUS_REGULAR / 2;
} // calculate number position for animation


function transform(index, t) {
  var x = translateX(index, t);
  var y = translateY(index, t);
  return "translate(".concat(x, "px, ").concat(y, "px)");
}

function isWithinRadius(x, y, radius) {
  return Math.sqrt(x * x + y * y) < radius;
}

// normalize any angles to 0-360 deg
function normalize(angle) {
  return (angle % 360 + 360) % 360;
}
/*
	calculates the shortest angle between the prev and next angle
	to animate to - positive spins clockwise, negative is ccw

	- prev is the previous angle - can literally be almost any value,
	eg: 480 is valid, -480 is valid
	- next is the angle to rotate to - is always between 0-360
	- must return an angle relative to the previous, so once again
	this value can be any negative or positive value (like prev)

	function normalizes each angle, creates an upper and lower bound
	based on previous angle and figures out which direction is shorter
	for next - then diff and add/subtract to previous angle
*/


function calcAnimationAngle(prev, next) {
  var p = normalize(prev);
  var n = normalize(next);
  var lower = p;
  var upper = p; // TODO - implement without while loops

  while (n < lower) {
    lower -= 360;
  }

  while (n >= upper) {
    upper += 360;
  }

  if (upper - n < n - lower) {
    return prev - (upper - n);
  } else {
    return prev + (n - lower);
  }
}