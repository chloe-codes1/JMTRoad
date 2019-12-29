"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _ClockHand = _interopRequireDefault(require("../ClockHand"));

require("./helpers/setup");

var _utils = require("./helpers/utils");

var _constants = require("../../helpers/constants");

var _clickData = require("./helpers/click-data");

// import React from 'react'
describe('dom updates correctly', function () {
  beforeEach(function () {
    (0, _utils.mockAnimations)();
    jest.useFakeTimers();
  });
  describe('clock hand length updates correctly during 24h mode', function () {
    function testClockHandLength(coords, expectedLength) {
      var _renderTK = (0, _utils.renderTK)({
        hour24Mode: true
      }),
          wrapper = _renderTK.wrapper;

      (0, _utils.triggerMouseClick)(wrapper, coords);
      var html = wrapper.find(_ClockHand.default).find('line').html();
      var y2 = html.toString().match(/y2\="(.*?)"/)[1];
      /*
      	TODO
      	- should be able to do `line.prop('y2')` but props aren't updating
      	while dom is... wait for react-spring to update to 9 and see if
      	it fixes it
      	- in the meantime, render dom, get string and parse out y2 value
      */

      expect(parseInt(y2, 10)).toEqual(expectedLength);
    }

    test('handles inner 3', function () {
      var len = (0, _constants.getClockHandLength)(_constants.MODE.HOURS_24, true);
      testClockHandLength(_clickData.HOUR_3_INNER, len);
    });
    test('handles outer 3', function () {
      var len = (0, _constants.getClockHandLength)(_constants.MODE.HOURS_24, false);
      testClockHandLength(_clickData.HOUR_3_OUTER, len);
    });
    test('handles inner 24', function () {
      var len = (0, _constants.getClockHandLength)(_constants.MODE.HOURS_24, true);
      testClockHandLength(_clickData.HOUR_12_INNER, len);
    });
    test('handles outer 24', function () {
      var len = (0, _constants.getClockHandLength)(_constants.MODE.HOURS_24, false);
      testClockHandLength(_clickData.HOUR_24_OUTER, len);
    });
  });
});