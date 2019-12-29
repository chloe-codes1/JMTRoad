"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateProvider = StateProvider;
exports.default = useTimekeeperState;

var _core = require("@emotion/core");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _lodash = _interopRequireDefault(require("lodash.debounce"));

var _time = require("../helpers/time");

var _configContext = _interopRequireDefault(require("./config-context"));

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var stateContext = (0, _react.createContext)({});

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TIME':
      return (0, _objectSpread3.default)({}, state, {
        time: action.time,
        meridiem: action.meridiem || state.meridiem
      });

    case 'SET_MODE':
      return (0, _objectSpread3.default)({}, state, {
        mode: action.mode
      });

    case 'SET_MERIDIEM':
      return (0, _objectSpread3.default)({}, state, {
        meridiem: action.meridiem
      });
  }

  return state;
}

function StateProvider(_ref) {
  var onChange = _ref.onChange,
      parentTime = _ref.time,
      children = _ref.children;
  var config = (0, _configContext.default)();

  var _useReducer = (0, _react.useReducer)(reducer, null, function () {
    return {
      time: (0, _time.parseTime)(parentTime),
      mode: config.hour24Mode ? _constants.MODE.HOURS_24 : _constants.MODE.HOURS_12,
      // need meridiem for context when 12h mode, so can tell
      // if user is changing hours before or after 12pm
      meridiem: (0, _time.parseMeridiem)(parentTime)
    };
  }),
      _useReducer2 = (0, _slicedToArray2.default)(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var mode = state.mode,
      time = state.time,
      meridiem = state.meridiem;
  var refTime = (0, _react.useRef)(time); // handle time update if parent changes

  (0, _react.useEffect)(function () {
    if (parentTime == null) {
      return;
    }

    var newTime = (0, _time.parseTime)(parentTime);

    if ((0, _utils.isSameTime)(newTime, refTime.current)) {
      return;
    }

    var action = {
      type: 'SET_TIME',
      time: (0, _time.parseTime)(parentTime)
    };

    if (!config.hour24Mode) {
      action.meridiem = (0, _time.parseMeridiem)(parentTime);
    }

    dispatch(action);
  }, [config.hour24Mode, parentTime]);
  var getComposedTime = (0, _react.useCallback)(function () {
    var time = refTime.current;
    return (0, _time.composeTime)(time.hour, time.minute);
  }, []); // debounced onChange function from parent

  var debounceUpdateParent = (0, _react.useMemo)(function () {
    if (typeof onChange === 'function') {
      return (0, _lodash.default)(function () {
        onChange(getComposedTime());
      }, 80);
    }

    return function () {};
  }, [getComposedTime, onChange]); // update 24 hour time on meridiem change

  function updateMeridiem(newMeridiem) {
    if (meridiem === newMeridiem) {
      return;
    }

    var newTime = {
      minute: time.minute,
      hour: 0
    };

    if (newMeridiem === 'am') {
      newTime.hour = time.hour - 12;
    } else if (newMeridiem === 'pm') {
      newTime.hour = time.hour + 12;
    }

    _actuallySetTime(newTime, newMeridiem);
  } // update time on component and then on parent


  function _actuallySetTime(newTime, meridiem) {
    // update component global state
    dispatch({
      type: 'SET_TIME',
      time: newTime,
      meridiem: meridiem
    });
    refTime.current = newTime; // update time on parent

    debounceUpdateParent();
  } // this method is called only due to changes in clock actions


  function updateTime(val) {
    // account if minutes is 60 (eg: 59 rounded to 60)
    val = val % 60; // account for max number being 12 during 12h mode

    if (mode === _constants.MODE.HOURS_12 && meridiem === 'pm') {
      val += 12;
    } // generate new time and update timekeeper state


    var unit = (0, _utils.isHourMode)(mode) ? 'hour' : 'minute'; // useful for same value when dragging between degrees in hours

    if (refTime.current[unit] === val) {
      return;
    }

    var newTime = (0, _objectSpread3.default)({}, time, (0, _defineProperty2.default)({}, unit, val));

    _actuallySetTime(newTime);
  }

  var setMode = (0, _react.useCallback)(function (mode) {
    var m = mode;

    if ((0, _utils.isHourMode)(mode)) {
      m = config.hour24Mode ? _constants.MODE.HOURS_24 : _constants.MODE.HOURS_12;
    }

    dispatch({
      type: 'SET_MODE',
      mode: m
    });
  }, [config.hour24Mode]);
  var value = {
    time: time,
    mode: mode,
    updateTime: updateTime,
    updateMeridiem: updateMeridiem,
    setMode: setMode,
    getComposedTime: getComposedTime
  };
  return (0, _core.jsx)(stateContext.Provider, {
    value: value
  }, children);
}

function useTimekeeperState() {
  return (0, _react.useContext)(stateContext);
}