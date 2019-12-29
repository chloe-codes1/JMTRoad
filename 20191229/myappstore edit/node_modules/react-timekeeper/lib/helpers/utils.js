"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTimeValue = getTimeValue;
exports.isHourMode = isHourMode;
exports.isMinuteMode = isMinuteMode;
exports.isSameTime = isSameTime;

var _constants = require("./constants");

function modeToUnit(mode) {
  return mode === _constants.MODE.MINUTES ? 'minute' : 'hour';
}

function getTimeValue(mode, time) {
  var unit = modeToUnit(mode);
  return time[unit];
}

function isHourMode(mode) {
  return mode === _constants.MODE.HOURS_12 || mode === _constants.MODE.HOURS_24;
}

function isMinuteMode(mode) {
  return mode === _constants.MODE.MINUTES;
}

function isSameTime(prev, next) {
  return prev.hour === next.hour && prev.minute === next.minute;
}