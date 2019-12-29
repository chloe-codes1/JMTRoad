"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ClockWrapper;

var _core = require("@emotion/core");

var _react = _interopRequireWildcard(require("react"));

var _reactSpring = require("react-spring");

var _ClockHand = _interopRequireDefault(require("./ClockHand"));

var _Numbers = require("./Numbers");

var _constants = require("../helpers/constants");

var _utils = require("../helpers/utils");

var _clock = _interopRequireDefault(require("./styles/clock"));

var _configContext = _interopRequireDefault(require("../hooks/config-context"));

var _stateContext = _interopRequireDefault(require("../hooks/state-context"));

function exitPosition(mode) {
  return (0, _utils.isHourMode)(mode) ? _constants.INITIAL_HOUR_TRANSFORM : _constants.INITIAL_MINUTE_TRANSFORM;
}

function initialPosition(mode) {
  return (0, _utils.isMinuteMode)(mode) ? _constants.INITIAL_HOUR_TRANSFORM : _constants.INITIAL_MINUTE_TRANSFORM;
}

function ClockWrapper(_ref) {
  var clockEl = _ref.clockEl;
  var firstTime = (0, _react.useRef)(true);

  var _useConfig = (0, _configContext.default)(),
      hour24Mode = _useConfig.hour24Mode;

  var _useTimekeeperState = (0, _stateContext.default)(),
      mode = _useTimekeeperState.mode,
      time = _useTimekeeperState.time;

  var transitions = (0, _reactSpring.useTransition)(mode, null, {
    unique: true,
    from: !firstTime.current && {
      opacity: 0,
      translate: initialPosition(mode),
      translateInner: _constants.INNER_NUMBER_POSITIONING.exit
    },
    enter: {
      opacity: 1,
      translate: (0, _constants.getOuterNumberPosition)(mode),
      translateInner: _constants.INNER_NUMBER_POSITIONING.enter
    },
    leave: {
      opacity: 0,
      translate: exitPosition(mode),
      translateInner: _constants.INNER_NUMBER_POSITIONING.exit
    }
  });
  (0, _react.useEffect)(function () {
    // don't show intial animation on first render - ie: {from : ...}
    firstTime.current = false;
  }, []);
  return (0, _core.jsx)("div", {
    className: "react-timekeeper__clock",
    css: _clock.default,
    ref: clockEl
  }, transitions.map(function (_ref2) {
    var currentMode = _ref2.item,
        key = _ref2.key,
        props = _ref2.props;

    // TODO - weird hot reloading issue, remove during compilation
    if (!currentMode) {
      return null;
    }

    return (0, _utils.isMinuteMode)(currentMode) ? (0, _core.jsx)(_Numbers.MinuteNumbers, {
      anim: props,
      key: key
    }) : (0, _core.jsx)(_Numbers.HourNumbers, {
      anim: props,
      key: key,
      mode: currentMode,
      hour24Mode: hour24Mode
    });
  }), (0, _core.jsx)(_ClockHand.default, {
    time: time,
    mode: mode
  }));
}