"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ClockWrapper;

var _core = require("@emotion/core");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _configContext = _interopRequireDefault(require("../hooks/config-context"));

var _Clock = _interopRequireDefault(require("./Clock"));

var _Meridiems = _interopRequireDefault(require("./Meridiems"));

var _clockWrapper = _interopRequireDefault(require("./styles/clock-wrapper"));

var _clockEvents = _interopRequireDefault(require("../hooks/clock-events"));

var _constants = require("../helpers/constants");

var _utils = require("../helpers/utils");

var _stateContext = _interopRequireDefault(require("../hooks/state-context"));

function ClockWrapper() {
  var config = (0, _configContext.default)(); // clock events

  var clock = (0, _react.useRef)(null);

  var _useClockEvents = (0, _clockEvents.default)(clock, calculateTimeValue),
      bind = _useClockEvents.bind;

  var _useTimekeeperState = (0, _stateContext.default)(),
      mode = _useTimekeeperState.mode,
      updateTime = _useTimekeeperState.updateTime,
      setMode = _useTimekeeperState.setMode,
      getComposedTime = _useTimekeeperState.getComposedTime;
  /*
  	LOGIC AROUND COARSE
  	- on drag, if count < 2, do not force coarse
  	- on mouseup, if count < 2 do not force coarse
  	- handlepoint
  		- if `wasTapped` OR `forceCoarse` config, then coarse it
  	- coarse is just rounding number to an increment before setting unit
  		LOGIC AROUND CAN CHANGE UNIT
  	- on drag, CAN NOT change unit
  	- on mouseup, can change unit
  	- AFTER time has been set, then determine if need to change unit
  		- based on this and user input
  */

  /*
  	converts angle into time, also factors in any rounding to the closest increment
  */


  function calculateTimeValue(angle, _ref) {
    var _ref$canAutoChangeUni = _ref.canAutoChangeUnit,
        canAutoChangeUnit = _ref$canAutoChangeUni === void 0 ? false : _ref$canAutoChangeUni,
        _ref$wasTapped = _ref.wasTapped,
        wasTapped = _ref$wasTapped === void 0 ? false : _ref$wasTapped,
        _ref$isInnerClick = _ref.isInnerClick,
        isInnerClick = _ref$isInnerClick === void 0 ? false : _ref$isInnerClick;
    // total number of allowable increments, 12/24 for hours, 60 for min
    var totalIncrements = _constants.CLOCK_VALUES[mode].increments; // minimum increment used for rounding

    var minIncrement = 1; // coarse minutes

    if ((0, _utils.isMinuteMode)(mode) && (wasTapped || config.forceCoarseMinutes)) {
      minIncrement = config.coarseMinutes;
    }

    var val = angle / 360 * totalIncrements;
    var selected = Math.round(val / minIncrement) * minIncrement;

    if (mode === _constants.MODE.HOURS_24 && config.hour24Mode) {
      // fixes 12pm and midnight, both angle -> selected return 0
      // for midnight need a final selected of 0, and for noon need 12
      if (!isInnerClick && selected !== 0) {
        selected += 12;
      } else if (isInnerClick && selected === 0) {
        selected += 12;
      }
    } // update time officially on timekeeper


    updateTime(selected); // handle any unit autochanges on done click

    if (canAutoChangeUnit) {
      if (config.switchToMinuteOnHourSelect && (0, _utils.isHourMode)(mode)) {
        setMode(_constants.MODE.MINUTES);
      } else if (config.closeOnMinuteSelect && (0, _utils.isMinuteMode)(mode)) {
        config.onDoneClick && config.onDoneClick(getComposedTime());
      }
    }
  }

  return (0, _core.jsx)("div", (0, _extends2.default)({}, bind, {
    className: "react-timekeeper__clock-wrapper",
    css: _clockWrapper.default
  }), (0, _core.jsx)(_Clock.default, {
    clockEl: clock
  }), !config.hour24Mode && (0, _core.jsx)(_Meridiems.default, null));
}