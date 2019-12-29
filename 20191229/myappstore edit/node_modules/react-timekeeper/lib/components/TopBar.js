"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TopBar;

var _core = require("@emotion/core");

var _css2 = _interopRequireDefault(require("@emotion/css"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _TimeDropdown = _interopRequireDefault(require("./TimeDropdown"));

var _stateContext = _interopRequireDefault(require("../hooks/state-context"));

var _configContext = _interopRequireDefault(require("../hooks/config-context"));

var styles = _interopRequireWildcard(require("./styles/top-bar"));

var _constants = require("../helpers/constants");

var _utils = require("../helpers/utils");

function TopBar() {
  var _useConfig = (0, _configContext.default)(),
      hour24Mode = _useConfig.hour24Mode;

  var _useTimekeeperState = (0, _stateContext.default)(),
      mode = _useTimekeeperState.mode,
      time = _useTimekeeperState.time,
      updateMeridiem = _useTimekeeperState.updateMeridiem,
      setMode = _useTimekeeperState.setMode;

  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1]; // time clicks


  function timeClick(type) {
    var current = mode === _constants.MODE.MINUTES ? 'minute' : 'hour';

    if (type === current) {
      setOpen(current);
    } else {
      var m = mode === _constants.MODE.MINUTES ? _constants.MODE.HOURS_24 : _constants.MODE.MINUTES;
      setMode(m);
    }
  } // double ternary nastiness


  var hour = hour24Mode ? time.hour : time.hour % 12 === 0 ? 12 : time.hour % 12; // meridiem

  var meridiem = time.hour >= 12 ? _constants.MERIDIEM.pm : _constants.MERIDIEM.am;

  function toggleMeridiem() {
    var m = meridiem === _constants.MERIDIEM.am ? _constants.MERIDIEM.pm : _constants.MERIDIEM.am;
    updateMeridiem(m);
  }

  var isHour = (0, _utils.isHourMode)(mode);
  var formattedMinute = ('0' + time.minute).slice(-2);

  var closeDropdown = function closeDropdown() {
    return setOpen(null);
  };

  return (0, _core.jsx)("div", {
    css: styles.wrapper(hour24Mode),
    className: "react-timekeeper__top-bar"
  }, (0, _core.jsx)("div", {
    css: styles.hourWrapper(hour24Mode),
    className: "react-timekeeper__tb-minute-wrapper"
  }, (0, _core.jsx)("span", {
    css:
    /*#__PURE__*/
    (0, _css2.default)([styles.time(isHour)], process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1RvcEJhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaURLIiwiZmlsZSI6Ii4uLy4uL3NyYy9jb21wb25lbnRzL1RvcEJhci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGpzeCB9IGZyb20gJ0BlbW90aW9uL2NvcmUnXG5cbmltcG9ydCBUaW1lRHJvcGRvd24gZnJvbSAnLi9UaW1lRHJvcGRvd24nXG5pbXBvcnQgdXNlVGltZWtlZXBlclN0YXRlIGZyb20gJy4uL2hvb2tzL3N0YXRlLWNvbnRleHQnXG5pbXBvcnQgdXNlQ29uZmlnIGZyb20gJy4uL2hvb2tzL2NvbmZpZy1jb250ZXh0J1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vc3R5bGVzL3RvcC1iYXInXG5pbXBvcnQgeyBNT0RFLCBNRVJJRElFTSB9IGZyb20gJy4uL2hlbHBlcnMvY29uc3RhbnRzJ1xuaW1wb3J0IHsgaXNIb3VyTW9kZSB9IGZyb20gJy4uL2hlbHBlcnMvdXRpbHMnXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRvcEJhcigpIHtcblx0Y29uc3QgeyBob3VyMjRNb2RlIH0gPSB1c2VDb25maWcoKVxuXHRjb25zdCB7IG1vZGUsIHRpbWUsIHVwZGF0ZU1lcmlkaWVtLCBzZXRNb2RlIH0gPSB1c2VUaW1la2VlcGVyU3RhdGUoKVxuXHRjb25zdCBbb3Blbiwgc2V0T3Blbl0gPSB1c2VTdGF0ZTxudWxsIHwgJ2hvdXInIHwgJ21pbnV0ZSc+KG51bGwpXG5cblx0Ly8gdGltZSBjbGlja3Ncblx0ZnVuY3Rpb24gdGltZUNsaWNrKHR5cGU6ICdtaW51dGUnIHwgJ2hvdXInKSB7XG5cdFx0Y29uc3QgY3VycmVudCA9IG1vZGUgPT09IE1PREUuTUlOVVRFUyA/ICdtaW51dGUnIDogJ2hvdXInXG5cdFx0aWYgKHR5cGUgPT09IGN1cnJlbnQpIHtcblx0XHRcdHNldE9wZW4oY3VycmVudClcblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc3QgbSA9IG1vZGUgPT09IE1PREUuTUlOVVRFUyA/IE1PREUuSE9VUlNfMjQgOiBNT0RFLk1JTlVURVNcblx0XHRcdHNldE1vZGUobSlcblx0XHR9XG5cdH1cblxuXHQvLyBkb3VibGUgdGVybmFyeSBuYXN0aW5lc3Ncblx0Y29uc3QgaG91ciA9IGhvdXIyNE1vZGUgPyB0aW1lLmhvdXIgOiB0aW1lLmhvdXIgJSAxMiA9PT0gMCA/IDEyIDogdGltZS5ob3VyICUgMTJcblxuXHQvLyBtZXJpZGllbVxuXHRjb25zdCBtZXJpZGllbSA9IHRpbWUuaG91ciA+PSAxMiA/IE1FUklESUVNLnBtIDogTUVSSURJRU0uYW1cblx0ZnVuY3Rpb24gdG9nZ2xlTWVyaWRpZW0oKSB7XG5cdFx0Y29uc3QgbSA9IG1lcmlkaWVtID09PSBNRVJJRElFTS5hbSA/IE1FUklESUVNLnBtIDogTUVSSURJRU0uYW1cblx0XHR1cGRhdGVNZXJpZGllbShtKVxuXHR9XG5cblx0Y29uc3QgaXNIb3VyID0gaXNIb3VyTW9kZShtb2RlKVxuXHRjb25zdCBmb3JtYXR0ZWRNaW51dGUgPSAoJzAnICsgdGltZS5taW51dGUpLnNsaWNlKC0yKVxuXG5cdGNvbnN0IGNsb3NlRHJvcGRvd24gPSAoKSA9PiBzZXRPcGVuKG51bGwpXG5cblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNzcz17c3R5bGVzLndyYXBwZXIoaG91cjI0TW9kZSl9IGNsYXNzTmFtZT1cInJlYWN0LXRpbWVrZWVwZXJfX3RvcC1iYXJcIj5cblx0XHRcdHsvKiBob3VyICovfVxuXHRcdFx0PGRpdlxuXHRcdFx0XHRjc3M9e3N0eWxlcy5ob3VyV3JhcHBlcihob3VyMjRNb2RlKX1cblx0XHRcdFx0Y2xhc3NOYW1lPVwicmVhY3QtdGltZWtlZXBlcl9fdGItbWludXRlLXdyYXBwZXJcIlxuXHRcdFx0PlxuXHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdGNzcz17W3N0eWxlcy50aW1lKGlzSG91cildfVxuXHRcdFx0XHRcdG9uQ2xpY2s9eygpID0+IHRpbWVDbGljaygnaG91cicpfVxuXHRcdFx0XHRcdGRhdGEtdHlwZT1cImhvdXJcIlxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cInJlYWN0LXRpbWVrZWVwZXJfX3RiLWhvdXJcIlxuXHRcdFx0XHQ+XG5cdFx0XHRcdFx0e2hvdXJ9XG5cdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0e29wZW4gPT09ICdob3VyJyAmJiA8VGltZURyb3Bkb3duIGNsb3NlPXtjbG9zZURyb3Bkb3dufSAvPn1cblx0XHRcdDwvZGl2PlxuXG5cdFx0XHQ8c3BhbiBjc3M9e3N0eWxlcy5jb2xvbn0gY2xhc3NOYW1lPVwicmVhY3QtdGltZWtlZXBlcl9fdGItY29sb25cIj5cblx0XHRcdFx0OlxuXHRcdFx0PC9zcGFuPlxuXG5cdFx0XHR7LyogbWludXRlICovfVxuXHRcdFx0PGRpdlxuXHRcdFx0XHRjc3M9e3N0eWxlcy5taW51dGVXcmFwcGVyKGhvdXIyNE1vZGUpfVxuXHRcdFx0XHRjbGFzc05hbWU9XCJyZWFjdC10aW1la2VlcGVyX190Yi1ob3VyLXdyYXBwZXJcIlxuXHRcdFx0PlxuXHRcdFx0XHQ8c3BhblxuXHRcdFx0XHRcdGNzcz17c3R5bGVzLnRpbWUoIWlzSG91cil9XG5cdFx0XHRcdFx0b25DbGljaz17KCkgPT4gdGltZUNsaWNrKCdtaW51dGUnKX1cblx0XHRcdFx0XHRkYXRhLXR5cGU9XCJtaW51dGVcIlxuXHRcdFx0XHRcdGNsYXNzTmFtZT1cInJlYWN0LXRpbWVrZWVwZXJfX3RiLW1pbnV0ZVwiXG5cdFx0XHRcdD5cblx0XHRcdFx0XHR7Zm9ybWF0dGVkTWludXRlfVxuXHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdHtvcGVuID09PSAnbWludXRlJyAmJiA8VGltZURyb3Bkb3duIGNsb3NlPXtjbG9zZURyb3Bkb3dufSAvPn1cblx0XHRcdDwvZGl2PlxuXG5cdFx0XHR7LyogbWVyaWRpZW0gKi99XG5cdFx0XHR7IWhvdXIyNE1vZGUgJiYgKFxuXHRcdFx0XHQ8YnV0dG9uXG5cdFx0XHRcdFx0bmFtZT1cIm1lcmlkaWVtXCJcblx0XHRcdFx0XHR0eXBlPVwiYnV0dG9uXCJcblx0XHRcdFx0XHRvbkNsaWNrPXt0b2dnbGVNZXJpZGllbX1cblx0XHRcdFx0XHRjc3M9e3N0eWxlcy5tZXJpZGllbX1cblx0XHRcdFx0XHRjbGFzc05hbWU9XCJyZWFjdC10aW1la2VlcGVyLWJ1dHRvbi1yZXNldCByZWFjdC10aW1la2VlcGVyX190Yi1tZXJpZGllbVwiXG5cdFx0XHRcdD5cblx0XHRcdFx0XHR7bWVyaWRpZW19XG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0KX1cblx0XHQ8L2Rpdj5cblx0KVxufVxuIl19 */"),
    onClick: function onClick() {
      return timeClick('hour');
    },
    "data-type": "hour",
    className: "react-timekeeper__tb-hour"
  }, hour), open === 'hour' && (0, _core.jsx)(_TimeDropdown.default, {
    close: closeDropdown
  })), (0, _core.jsx)("span", {
    css: styles.colon,
    className: "react-timekeeper__tb-colon"
  }, ":"), (0, _core.jsx)("div", {
    css: styles.minuteWrapper(hour24Mode),
    className: "react-timekeeper__tb-hour-wrapper"
  }, (0, _core.jsx)("span", {
    css: styles.time(!isHour),
    onClick: function onClick() {
      return timeClick('minute');
    },
    "data-type": "minute",
    className: "react-timekeeper__tb-minute"
  }, formattedMinute), open === 'minute' && (0, _core.jsx)(_TimeDropdown.default, {
    close: closeDropdown
  })), !hour24Mode && (0, _core.jsx)("button", {
    name: "meridiem",
    type: "button",
    onClick: toggleMeridiem,
    css: styles.meridiem,
    className: "react-timekeeper-button-reset react-timekeeper__tb-meridiem"
  }, meridiem));
}