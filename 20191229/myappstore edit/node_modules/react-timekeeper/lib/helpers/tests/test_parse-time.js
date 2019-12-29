"use strict";

var _time = require("../time");

describe('helpers/parse-time', function () {
  describe('pass string', function () {
    test('parses 12 hour format', function () {
      expect((0, _time.parseTime)('8:32 am')).toMatchObject({
        hour: 8,
        minute: 32
      });
      expect((0, _time.parseTime)('12:32 am')).toMatchObject({
        hour: 0,
        minute: 32
      });
      expect((0, _time.parseTime)('12:32 pm')).toMatchObject({
        hour: 12,
        minute: 32
      });
      expect((0, _time.parseTime)('8:32am')).toMatchObject({
        hour: 8,
        minute: 32
      });
      expect((0, _time.parseTime)('12:32pm')).toMatchObject({
        hour: 12,
        minute: 32
      });
      expect((0, _time.parseTime)('0:32pm')).toMatchObject({
        hour: 12,
        minute: 32
      });
      expect((0, _time.parseTime)('3:32pm')).toMatchObject({
        hour: 15,
        minute: 32
      });
    });
    test('parses 24 hour format string', function () {
      expect((0, _time.parseTime)('8:32')).toMatchObject({
        hour: 8,
        minute: 32
      });
      expect((0, _time.parseTime)('18:30')).toMatchObject({
        hour: 18,
        minute: 30
      });
      expect((0, _time.parseTime)('0:30')).toMatchObject({
        hour: 0,
        minute: 30
      });
      expect((0, _time.parseTime)('12:00')).toMatchObject({
        hour: 12,
        minute: 0
      });
      expect((0, _time.parseTime)('24:30')).toMatchObject({
        hour: 0,
        minute: 30
      });
    });
    test('handles invalid time', function () {
      expect(function () {
        return (0, _time.parseTime)('25:70 am');
      }).toThrow();
      expect(function () {
        return (0, _time.parseTime)('13:10 am');
      }).toThrow();
      expect(function () {
        return (0, _time.parseTime)('8:70 am');
      }).toThrow();
      expect(function () {
        return (0, _time.parseTime)('8:20 zz');
      }).toThrow();
      expect(function () {
        return (0, _time.parseTime)('25:50');
      }).toThrow();
      expect(function () {
        return (0, _time.parseTime)('12:70');
      }).toThrow();
      expect(function () {
        return (0, _time.parseTime)('25:70');
      }).toThrow();
      expect(function () {
        return (0, _time.parseTime)('random string');
      }).toThrow();
    });
  });
  describe('pass object', function () {
    test('parses time object with no meridiem (24 hr format)', function () {
      expect((0, _time.parseTime)({
        hour: 6,
        minute: 32
      })).toMatchObject({
        hour: 6,
        minute: 32
      });
      expect((0, _time.parseTime)({
        hour: 12,
        minute: 32
      })).toMatchObject({
        hour: 12,
        minute: 32
      });
      expect((0, _time.parseTime)({
        hour: 14,
        minute: 32
      })).toMatchObject({
        hour: 14,
        minute: 32
      });
      expect((0, _time.parseTime)({
        hour: 24,
        minute: 32
      })).toMatchObject({
        hour: 0,
        minute: 32
      });
    });
    test('parses time object with a meridiem (12 hr)', function () {
      expect((0, _time.parseTime)({
        hour: 8,
        minute: 32,
        meridiem: 'am'
      })).toMatchObject({
        hour: 8,
        minute: 32
      });
      expect((0, _time.parseTime)({
        hour: 2,
        minute: 32,
        meridiem: 'pm'
      })).toMatchObject({
        hour: 14,
        minute: 32
      });
      expect((0, _time.parseTime)({
        hour: 0,
        minute: 32,
        meridiem: 'am'
      })).toMatchObject({
        hour: 0,
        minute: 32
      });
    });
    test('handles invalid time', function () {
      expect(function () {
        return (0, _time.parseTime)({
          hour: 26,
          minute: 32
        });
      }).toThrow();
      expect(function () {
        return (0, _time.parseTime)({
          hour: 12,
          minute: 70
        });
      }).toThrow();
      expect(function () {
        return (0, _time.parseTime)({
          hour: 26,
          minute: 70
        });
      }).toThrow();
      expect(function () {
        return (0, _time.parseTime)({
          someKey: 26,
          anotherKey: 70
        });
      }).toThrow();
    });
    test('handles empty time argument', function () {
      var defaultTime = {
        hour: 12,
        minute: 30
      };
      expect((0, _time.parseTime)()).toMatchObject(defaultTime);
      expect((0, _time.parseTime)(null)).toMatchObject(defaultTime);
    });
  });
});