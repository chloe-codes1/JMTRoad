"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DONE_BUTTON_BORDER_COLOR = exports.DONE_BUTTON_COLOR = void 0;

var _core = require("@emotion/core");

var _constants = require("./constants");

var DONE_BUTTON_COLOR = '#686868';
exports.DONE_BUTTON_COLOR = DONE_BUTTON_COLOR;
var DONE_BUTTON_BORDER_COLOR = '#CCC';
exports.DONE_BUTTON_BORDER_COLOR = DONE_BUTTON_BORDER_COLOR;
var doneButton =
/*#__PURE__*/
(0, _core.css)("background:", _constants.CLOCK_WRAPPER_BACKGROUND, ";display:block;color:", DONE_BUTTON_COLOR, ";text-transform:uppercase;border-top:1px solid ", DONE_BUTTON_BORDER_COLOR, ";text-align:center;cursor:pointer;padding:16px 0;font-size:13px;letter-spacing:0.5px;line-height:normal;font-weight:500;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3N0eWxlcy9kb25lLWJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNc0IiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvc3R5bGVzL2RvbmUtYnV0dG9uLnRzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY3NzLCBqc3ggfSBmcm9tICdAZW1vdGlvbi9jb3JlJ1xuaW1wb3J0IHsgQ0xPQ0tfV1JBUFBFUl9CQUNLR1JPVU5EIH0gZnJvbSAnLi9jb25zdGFudHMnXG5cbmV4cG9ydCBjb25zdCBET05FX0JVVFRPTl9DT0xPUiA9ICcjNjg2ODY4J1xuZXhwb3J0IGNvbnN0IERPTkVfQlVUVE9OX0JPUkRFUl9DT0xPUiA9ICcjQ0NDJ1xuXG5jb25zdCBkb25lQnV0dG9uID0gY3NzYFxuXHRiYWNrZ3JvdW5kOiAke0NMT0NLX1dSQVBQRVJfQkFDS0dST1VORH07XG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRjb2xvcjogJHtET05FX0JVVFRPTl9DT0xPUn07XG5cdHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG5cdGJvcmRlci10b3A6IDFweCBzb2xpZCAke0RPTkVfQlVUVE9OX0JPUkRFUl9DT0xPUn07XG5cdHRleHQtYWxpZ246IGNlbnRlcjtcblx0Y3Vyc29yOiBwb2ludGVyO1xuXHRwYWRkaW5nOiAxNnB4IDA7XG5cdGZvbnQtc2l6ZTogMTNweDtcblx0bGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuXHRsaW5lLWhlaWdodDogbm9ybWFsO1xuXHRmb250LXdlaWdodDogNTAwO1xuYFxuXG5leHBvcnQgZGVmYXVsdCBkb25lQnV0dG9uXG4iXX0= */"));
var _default = doneButton;
exports.default = _default;