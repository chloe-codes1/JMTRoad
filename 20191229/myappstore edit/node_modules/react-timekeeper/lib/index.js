"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "TimeInput", {
  enumerable: true,
  get: function get() {
    return _types.TimeInput;
  }
});
Object.defineProperty(exports, "TimeOutput", {
  enumerable: true,
  get: function get() {
    return _types.TimeOutput;
  }
});
exports.default = void 0;

var _TimeKeeperWrapper = _interopRequireDefault(require("./components/TimeKeeperWrapper"));

var _types = require("./helpers/types");

var _default = _TimeKeeperWrapper.default;
exports.default = _default;