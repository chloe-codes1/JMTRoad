"use strict";

var _time = require("../time");

describe('helpers/compose-time', function () {
  test('formatted24', function () {
    expect((0, _time.composeTime)(0, 30)).toMatchObject({
      formatted24: '0:30',
      formatted12: '12:30 am',
      formattedSimple: '12:30',
      hour: 0,
      hour12: 12,
      minute: 30,
      meridiem: 'am'
    });
    expect((0, _time.composeTime)(1, 30)).toMatchObject({
      formatted24: '1:30',
      formatted12: '1:30 am',
      formattedSimple: '1:30',
      hour: 1,
      hour12: 1,
      minute: 30,
      meridiem: 'am'
    });
    expect((0, _time.composeTime)(12, 30)).toMatchObject({
      formatted24: '12:30',
      formatted12: '12:30 pm',
      formattedSimple: '12:30',
      hour: 12,
      hour12: 12,
      minute: 30,
      meridiem: 'pm'
    });
    expect((0, _time.composeTime)(13, 30)).toMatchObject({
      formatted24: '13:30',
      formatted12: '1:30 pm',
      formattedSimple: '1:30',
      hour: 13,
      hour12: 1,
      minute: 30,
      meridiem: 'pm'
    }); // test for correct minute padding

    expect((0, _time.composeTime)(1, 5)).toHaveProperty('formatted24', '1:05');
    expect((0, _time.composeTime)(1, 0)).toHaveProperty('formatted24', '1:00');
  });
});