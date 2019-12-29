"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimeDropdown;

var _core = require("@emotion/core");

var _react = _interopRequireWildcard(require("react"));

var styles = _interopRequireWildcard(require("./styles/time-dropdown"));

var _configContext = _interopRequireDefault(require("../hooks/config-context"));

var _dom = require("../helpers/dom");

var _utils = require("../helpers/utils");

var _constants = require("../helpers/constants");

var _stateContext = _interopRequireDefault(require("../hooks/state-context"));

var scrollbarWidth = null;

function TimeDropdown(_ref) {
  var close = _ref.close;

  var _useConfig = (0, _configContext.default)(),
      hour24Mode = _useConfig.hour24Mode;

  var _useTimekeeperState = (0, _stateContext.default)(),
      updateTime = _useTimekeeperState.updateTime,
      mode = _useTimekeeperState.mode,
      time = _useTimekeeperState.time;

  var container = (0, _react.useRef)(null);
  var selectedOption = (0, _react.useRef)(null);
  var options = _constants.CLOCK_VALUES[mode].dropdown;
  var selected = (0, _utils.getTimeValue)(mode, time).toString();

  function disableBodyScroll() {
    document.documentElement.style.paddingRight = scrollbarWidth + 'px';
    document.documentElement.classList.add('react-timekeeper-noscroll');
  }

  function enableBodyScroll() {
    document.documentElement.style.paddingRight = 0;
    document.documentElement.classList.remove('react-timekeeper-noscroll');
  }

  var elsewhereClick = (0, _react.useCallback)(function (e) {
    if (!container.current || !e.target) {
      return;
    }

    if (!container.current.contains(e.target)) {
      close();
    }
  }, [close]);
  (0, _react.useEffect)(function () {
    // measure scroll bar width for first time
    if (scrollbarWidth == null) {
      scrollbarWidth = (0, _dom.getScrollBarWidth)();
    } // initial scroll in list


    if (selectedOption.current && container.current) {
      container.current.scrollTop = selectedOption.current.offsetTop;
    } // listener to close if click outside dropdown


    document.addEventListener('click', elsewhereClick, false);
    return function () {
      document.removeEventListener('click', elsewhereClick, false);
      enableBodyScroll();
    };
  }, [elsewhereClick]); // select a value

  function select(val) {
    var parsed = parseInt(val, 10);

    if (mode === _constants.MODE.HOURS_12 && parsed === 12) {
      parsed = 0;
    }

    updateTime(parsed);
    close();
  }

  return (0, _core.jsx)("div", {
    css: styles.wrapper(hour24Mode, mode),
    ref: container,
    onMouseEnter: disableBodyScroll,
    onMouseLeave: enableBodyScroll,
    className: "react-timekeeper__time-dropdown"
  }, (0, _core.jsx)("ul", {
    css: styles.options,
    className: "react-timekeeper__dropdown-numbers"
  }, options.map(function (o) {
    return (0, _core.jsx)("li", {
      ref: function ref(el) {
        return selected === o ? selectedOption.current = el : '';
      },
      css: styles.option(selected === o),
      key: o,
      onClick: function onClick() {
        return select(o);
      }
    }, o);
  })));
}