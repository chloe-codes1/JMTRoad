"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mockAnimations = mockAnimations;
exports.update = update;
exports.waitForUpdates = waitForUpdates;
exports.triggerMouseClick = triggerMouseClick;
exports.renderTK = renderTK;
exports.changeToMinutes = changeToMinutes;
exports.noop = void 0;

var _core = require("@emotion/core");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _testUtils = require("react-dom/test-utils");

var _ClockWrapper = _interopRequireDefault(require("../../ClockWrapper"));

var _TimeKeeperWrapper = _interopRequireDefault(require("../../TimeKeeperWrapper"));

var _TopBar = _interopRequireDefault(require("../../TopBar"));

var noop = function noop() {};

exports.noop = noop;

function mockAnimations() {
  global.requestAnimationFrame = function (fn) {
    return setTimeout(fn, 1);
  };
} // unused by itself?


function update() {
  (0, _testUtils.act)(function () {
    jest.runAllTimers();
  });
}

function waitForUpdates(wrapper) {
  // mock timers so animations finish
  (0, _testUtils.act)(function () {
    jest.runAllTimers();
  }); // update enzyme wrapper

  wrapper.update();
}

function triggerMouseClick(wrapper) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var cw = wrapper.find(_ClockWrapper.default); // simulate mouseup and then moouse down with coordinates

  cw.simulate('mousedown', {});
  (0, _testUtils.act)(function () {
    var e = new MouseEvent('mouseup', opts);
    document.dispatchEvent(e);
  });
  waitForUpdates(wrapper);
}

function renderTK() {
  var override = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var onChange = jest.fn();
  var props = (0, _objectSpread2.default)({
    time: {
      hour: 5,
      minute: 30
    },
    onChange: onChange
  }, override);
  var wrapper = (0, _enzyme.mount)((0, _core.jsx)(_TimeKeeperWrapper.default, props));
  return {
    wrapper: wrapper,
    onChange: onChange
  };
}

function changeToMinutes(wrapper) {
  var minute = wrapper.find(_TopBar.default).find('span[data-type="minute"]');
  minute.simulate('click');
  waitForUpdates(wrapper);
}