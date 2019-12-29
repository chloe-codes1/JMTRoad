"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigProvider = ConfigProvider;
exports.default = useConfig;

var _core = require("@emotion/core");

var _react = _interopRequireWildcard(require("react"));

var configContext = (0, _react.createContext)({});

function ConfigProvider(_ref) {
  var children = _ref.children,
      _ref$coarseMinutes = _ref.coarseMinutes,
      coarseMinutes = _ref$coarseMinutes === void 0 ? 5 : _ref$coarseMinutes,
      _ref$forceCoarseMinut = _ref.forceCoarseMinutes,
      forceCoarseMinutes = _ref$forceCoarseMinut === void 0 ? false : _ref$forceCoarseMinut,
      _ref$switchToMinuteOn = _ref.switchToMinuteOnHourSelect,
      switchToMinuteOnHourSelect = _ref$switchToMinuteOn === void 0 ? false : _ref$switchToMinuteOn,
      _ref$closeOnMinuteSel = _ref.closeOnMinuteSelect,
      closeOnMinuteSelect = _ref$closeOnMinuteSel === void 0 ? false : _ref$closeOnMinuteSel,
      _ref$hour24Mode = _ref.hour24Mode,
      hour24Mode = _ref$hour24Mode === void 0 ? false : _ref$hour24Mode,
      _ref$onDoneClick = _ref.onDoneClick,
      onDoneClick = _ref$onDoneClick === void 0 ? null : _ref$onDoneClick,
      _ref$doneButton = _ref.doneButton,
      doneButton = _ref$doneButton === void 0 ? null : _ref$doneButton;
  var config = (0, _react.useMemo)(function () {
    if (coarseMinutes < 1) {
      throw new Error('coarseMinutes must be at least 1');
    }

    return {
      coarseMinutes: coarseMinutes,
      forceCoarseMinutes: forceCoarseMinutes,
      switchToMinuteOnHourSelect: switchToMinuteOnHourSelect,
      closeOnMinuteSelect: closeOnMinuteSelect,
      hour24Mode: hour24Mode,
      onDoneClick: onDoneClick,
      doneButton: doneButton
    };
  }, [coarseMinutes, forceCoarseMinutes, switchToMinuteOnHourSelect, closeOnMinuteSelect, onDoneClick, hour24Mode, doneButton]);
  return (0, _core.jsx)(configContext.Provider, {
    value: config
  }, children);
}

function useConfig() {
  return (0, _react.useContext)(configContext);
}