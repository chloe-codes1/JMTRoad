"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = DoneButton;

var _core = require("@emotion/core");

var _react = _interopRequireDefault(require("react"));

var _configContext = _interopRequireDefault(require("../hooks/config-context"));

var _doneButton = _interopRequireDefault(require("./styles/done-button"));

var _stateContext = _interopRequireDefault(require("../hooks/state-context"));

function DoneButton() {
  var _useConfig = (0, _configContext.default)(),
      onDoneClick = _useConfig.onDoneClick,
      doneButton = _useConfig.doneButton;

  var _useTimekeeperState = (0, _stateContext.default)(),
      getComposedTime = _useTimekeeperState.getComposedTime;

  if (doneButton) {
    return doneButton(getComposedTime());
  }

  if (onDoneClick) {
    return (0, _core.jsx)("span", {
      css: _doneButton.default,
      onClick: function onClick(e) {
        return onDoneClick(getComposedTime(), e);
      },
      className: "react-timekeeper__done-button"
    }, "Done");
  }

  return null;
}