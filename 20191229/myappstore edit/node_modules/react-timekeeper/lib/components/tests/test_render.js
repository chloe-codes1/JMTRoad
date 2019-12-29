"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _core = require("@emotion/core");

var _react = _interopRequireDefault(require("react"));

var _Numbers = require("../Numbers");

var _Meridiems = _interopRequireDefault(require("../Meridiems"));

var _TopBar = _interopRequireDefault(require("../TopBar"));

var _DoneButton = _interopRequireDefault(require("../DoneButton"));

var _TimeDropdown = _interopRequireDefault(require("../TimeDropdown"));

require("./helpers/setup");

var _utils = require("./helpers/utils");

describe('it renders correctly', function () {
  beforeEach(function () {
    (0, _utils.mockAnimations)();
    jest.useFakeTimers();
  });
  test('has 12 hour numbers on 12h mode', function () {
    var _renderTK = (0, _utils.renderTK)(),
        wrapper = _renderTK.wrapper;

    var hours = wrapper.find(_Numbers.HourNumbers).find('span');
    expect(hours.length).toEqual(12);
  });
  test('has 24 hour numbers on 24h mode', function () {
    var _renderTK2 = (0, _utils.renderTK)({
      hour24Mode: true
    }),
        wrapper = _renderTK2.wrapper;

    var hours = wrapper.find(_Numbers.HourNumbers).find('span');
    expect(hours.length).toEqual(24);
  });
  test('has 12 minute numbers', function () {
    var _renderTK3 = (0, _utils.renderTK)(),
        wrapper = _renderTK3.wrapper;

    (0, _utils.changeToMinutes)(wrapper);
    var minutes = wrapper.find(_Numbers.MinuteNumbers).find('span');
    expect(minutes.length).toEqual(12);
  });
  test('displays meridiem selectors on 12h mode', function () {
    var _renderTK4 = (0, _utils.renderTK)(),
        wrapper = _renderTK4.wrapper;

    var meridiems = wrapper.find(_Meridiems.default);
    expect(meridiems).toExist();
  });
  test('displays no meridiem selectors on 24h mode', function () {
    var _renderTK5 = (0, _utils.renderTK)({
      hour24Mode: true
    }),
        wrapper = _renderTK5.wrapper;

    var meridiems = wrapper.find(_Meridiems.default);
    expect(meridiems).not.toExist();
  });
  describe('top bar', function () {
    test('displays top bar', function () {
      var _renderTK6 = (0, _utils.renderTK)(),
          wrapper = _renderTK6.wrapper;

      var topbar = wrapper.find(_TopBar.default);
      expect(topbar).toExist();
    });
    test('displays meridiem button if 12h mode', function () {
      var _renderTK7 = (0, _utils.renderTK)(),
          wrapper = _renderTK7.wrapper;

      var topbar = wrapper.find(_TopBar.default);
      var meridiem = topbar.find('button[name="meridiem"]');
      expect(meridiem).toExist();
    });
    test('displays no meridiem button if 24h mode', function () {
      var _renderTK8 = (0, _utils.renderTK)({
        hour24Mode: true
      }),
          wrapper = _renderTK8.wrapper;

      var topbar = wrapper.find(_TopBar.default);
      var meridiem = topbar.find('button[name="meridiem"]');
      expect(meridiem).not.toExist();
    });
    test('hour dropdown renders correctly for 12h', function () {
      var _renderTK9 = (0, _utils.renderTK)(),
          wrapper = _renderTK9.wrapper;

      var topbar = wrapper.find(_TopBar.default);
      var hour = topbar.find('span[data-type="hour"]');
      hour.simulate('click');
      var dropdown = wrapper.find(_TimeDropdown.default);
      expect(dropdown).toExist(); // is 12h so expect 12 numbers

      var numbers = dropdown.find('li');
      expect(numbers).toHaveLength(12); // click on a number

      expect(wrapper.find(_TimeDropdown.default));
      numbers.at(1).simulate('click'); // should be closed

      expect(wrapper.find(_TimeDropdown.default)).not.toExist();
    });
    test('hour dropdown renders correctly for 24h', function () {
      var _renderTK10 = (0, _utils.renderTK)({
        hour24Mode: true
      }),
          wrapper = _renderTK10.wrapper;

      var topbar = wrapper.find(_TopBar.default);
      var hour = topbar.find('span[data-type="hour"]');
      hour.simulate('click');
      var dropdown = wrapper.find(_TimeDropdown.default);
      expect(dropdown).toExist(); // is 24h so expect 24 numbers

      var numbers = dropdown.find('li');
      expect(numbers).toHaveLength(24); // click on a number

      expect(wrapper.find(_TimeDropdown.default));
      numbers.at(1).simulate('click'); // should be closed

      expect(wrapper.find(_TimeDropdown.default)).not.toExist();
    });
    test('minute dropdown renders correctly for 24h', function () {
      var _renderTK11 = (0, _utils.renderTK)({
        hour24Mode: true
      }),
          wrapper = _renderTK11.wrapper;

      var topbar = wrapper.find(_TopBar.default);
      var minute = topbar.find('span[data-type="minute"]');
      minute.simulate('click');
      minute.simulate('click');
      var dropdown = wrapper.find(_TimeDropdown.default);
      expect(dropdown).toExist(); // is 60m so expect 60 numbers

      var numbers = dropdown.find('li');
      expect(numbers).toHaveLength(60); // click on a number

      expect(wrapper.find(_TimeDropdown.default));
      numbers.at(1).simulate('click'); // should be closed

      expect(wrapper.find(_TimeDropdown.default)).not.toExist();
    });
  });
  describe('done button', function () {
    test("doesn't display any content if no done fn provided", function () {
      var _renderTK12 = (0, _utils.renderTK)(),
          wrapper = _renderTK12.wrapper;

      var done = wrapper.find(_DoneButton.default);
      expect(done.html()).toBeNull();
    });
    test('displays button if done fn provided', function () {
      var fn = jest.fn();
      var time = {
        hour: 12,
        minute: 30
      };

      var _renderTK13 = (0, _utils.renderTK)({
        onDoneClick: fn,
        time: time
      }),
          wrapper = _renderTK13.wrapper;

      var done = wrapper.find(_DoneButton.default);
      expect(done.text()).toMatch(/done/i); // test click

      done.find('span').simulate('click');
      expect(fn).toHaveBeenCalled();
      expect(fn).toBeCalledWith(expect.objectContaining({
        hour: time.hour,
        minute: time.minute
      }), expect.objectContaining({
        type: 'click',
        target: expect.anything()
      }));
    });
    test('displays content if done render props fn provided', function () {
      var buttonContent = (0, _core.jsx)("div", null, "click me");

      var doneButton = function doneButton() {
        return buttonContent;
      };

      var _renderTK14 = (0, _utils.renderTK)({
        doneButton: doneButton
      }),
          wrapper = _renderTK14.wrapper;

      var done = wrapper.find(_DoneButton.default);
      expect(done.contains(buttonContent)).toEqual(true);
    });
  });
});