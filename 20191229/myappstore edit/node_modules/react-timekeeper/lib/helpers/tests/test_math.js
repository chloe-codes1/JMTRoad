"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _math = require("../math");

describe('math/calcAnimationAngle', function () {
  function run(tc) {
    var _tc = (0, _slicedToArray2.default)(tc, 3),
        prev = _tc[0],
        next = _tc[1],
        expected = _tc[2];

    test("".concat(prev, " -> ").concat(next, " = ").concat(expected), function () {
      var fin = (0, _math.calcAnimationAngle)(prev, next); // sanity check - double check the test case is actually correct

      var diff = Math.abs(prev - expected);
      expect(diff).toBeLessThanOrEqual(180);
      expect(fin).toEqual(expected);
    });
  }

  var tests = [[30, 330, -30], [330, 240, 240], [330, 90, 360 + 90], [240, 340, 340], [90, 150, 150], [0, 150, 150], [330, 120, 360 + 120], [390, 60, 360 + 60], [390, 240, 240], [60, -60, -60], [-60, 60, 60], [-60, 240, -120], [240, 50, 360 + 50], [240, 330, 330], [240, 330, 330], [-120, 330, -30], [-390, 30, -330], [0, 0, 0], [0, 360, 0], [360, 360, 360]];
  tests.forEach(function (tc) {
    return run(tc);
  });
});