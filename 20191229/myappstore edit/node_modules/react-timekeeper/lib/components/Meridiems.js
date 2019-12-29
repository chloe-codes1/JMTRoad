"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Meridiems;

var _core = require("@emotion/core");

var _react = _interopRequireWildcard(require("react"));

var _meridiems = require("./styles/meridiems");

var _stateContext = _interopRequireDefault(require("../hooks/state-context"));

var _constants = require("../helpers/constants");

function Meridiems() {
  var _useTimekeeperState = (0, _stateContext.default)(),
      time = _useTimekeeperState.time,
      updateMeridiem = _useTimekeeperState.updateMeridiem;

  var setAM = (0, _react.useCallback)(function () {
    updateMeridiem(_constants.MERIDIEM.am);
  }, [updateMeridiem]);
  var setPM = (0, _react.useCallback)(function () {
    updateMeridiem(_constants.MERIDIEM.pm);
  }, [updateMeridiem]);
  var isPM = time.hour >= 12;
  return (0, _core.jsx)("div", {
    css: _meridiems.meridiemWrapper
  }, (0, _core.jsx)("button", {
    type: "button",
    css: (0, _meridiems.meridiem)({
      isSelected: !isPM
    }),
    className: "react-timekeeper-button-reset react-timekeeper__meridiem-toggle",
    onClick: setAM
  }, "AM"), (0, _core.jsx)("button", {
    type: "button",
    css: (0, _meridiems.meridiem)({
      isRight: true,
      isSelected: isPM
    }),
    className: "react-timekeeper-button-reset react-timekeeper__meridiem-toggle",
    onClick: setPM
  }, "PM"));
}