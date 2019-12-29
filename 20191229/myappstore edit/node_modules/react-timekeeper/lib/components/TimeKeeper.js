"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TimeKeeper;

var _core = require("@emotion/core");

var _react = _interopRequireDefault(require("react"));

var _global = _interopRequireDefault(require("./styles/global"));

var _main = _interopRequireDefault(require("./styles/main"));

var _TopBar = _interopRequireDefault(require("./TopBar"));

var _ClockWrapper = _interopRequireDefault(require("./ClockWrapper"));

var _DoneButton = _interopRequireDefault(require("./DoneButton"));

function TimeKeeper() {
  return (0, _core.jsx)(_react.default.Fragment, null, (0, _core.jsx)(_core.Global, {
    styles:
    /*#__PURE__*/
    (0, _core.css)(_global.default, process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL1RpbWVLZWVwZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVltQiIsImZpbGUiOiIuLi8uLi9zcmMvY29tcG9uZW50cy9UaW1lS2VlcGVyLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IEdsb2JhbCwgY3NzLCBqc3ggfSBmcm9tICdAZW1vdGlvbi9jb3JlJ1xuXG5pbXBvcnQgZ2xvYmFsU3R5bGUgZnJvbSAnLi9zdHlsZXMvZ2xvYmFsJ1xuaW1wb3J0IHN0eWxlIGZyb20gJy4vc3R5bGVzL21haW4nXG5pbXBvcnQgVG9wQmFyIGZyb20gJy4vVG9wQmFyJ1xuaW1wb3J0IENsb2NrV3JhcHBlciBmcm9tICcuL0Nsb2NrV3JhcHBlcidcbmltcG9ydCBEb25lQnV0dG9uIGZyb20gJy4vRG9uZUJ1dHRvbidcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGltZUtlZXBlcigpIHtcblx0cmV0dXJuIChcblx0XHQ8PlxuXHRcdFx0PEdsb2JhbCBzdHlsZXM9e2NzcyhnbG9iYWxTdHlsZSl9IC8+XG5cblx0XHRcdDxkaXYgY2xhc3NOYW1lPVwicmVhY3QtdGltZWtlZXBlclwiIGNzcz17c3R5bGV9PlxuXHRcdFx0XHQ8VG9wQmFyIC8+XG5cdFx0XHRcdDxDbG9ja1dyYXBwZXIgLz5cblx0XHRcdFx0PERvbmVCdXR0b24gLz5cblx0XHRcdDwvZGl2PlxuXHRcdDwvPlxuXHQpXG59XG4iXX0= */")
  }), (0, _core.jsx)("div", {
    className: "react-timekeeper",
    css: _main.default
  }, (0, _core.jsx)(_TopBar.default, null), (0, _core.jsx)(_ClockWrapper.default, null), (0, _core.jsx)(_DoneButton.default, null)));
}