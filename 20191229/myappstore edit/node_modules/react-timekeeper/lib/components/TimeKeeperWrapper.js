"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimepickerWithConfig;

var _core = require("@emotion/core");

var _react = _interopRequireDefault(require("react"));

var _TimeKeeper = _interopRequireDefault(require("./TimeKeeper"));

var _configContext = require("../hooks/config-context");

var _stateContext = require("../hooks/state-context");

function TimepickerWithConfig(_ref) {
  var time = _ref.time,
      onChange = _ref.onChange,
      coarseMinutes = _ref.coarseMinutes,
      forceCoarseMinutes = _ref.forceCoarseMinutes,
      switchToMinuteOnHourSelect = _ref.switchToMinuteOnHourSelect,
      closeOnMinuteSelect = _ref.closeOnMinuteSelect,
      hour24Mode = _ref.hour24Mode,
      onDoneClick = _ref.onDoneClick,
      doneButton = _ref.doneButton;
  return (0, _core.jsx)(_configContext.ConfigProvider, {
    coarseMinutes: coarseMinutes,
    forceCoarseMinutes: forceCoarseMinutes,
    switchToMinuteOnHourSelect: switchToMinuteOnHourSelect,
    closeOnMinuteSelect: closeOnMinuteSelect,
    hour24Mode: hour24Mode,
    onDoneClick: onDoneClick,
    doneButton: doneButton
  }, (0, _core.jsx)(_stateContext.StateProvider, {
    onChange: onChange,
    time: time
  }, (0, _core.jsx)(_TimeKeeper.default, null)));
}