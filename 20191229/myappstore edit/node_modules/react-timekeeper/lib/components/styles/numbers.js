"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.numbersWrapperStyle = exports.numbersStyle = void 0;

var _core = require("@emotion/core");

var _constants = require("../../helpers/constants");

var CLOCK_NUMBER_COLOR = '#999999';

var numbersStyle = function numbersStyle(_ref) {
  var _ref$hour24Mode = _ref.hour24Mode,
      hour24Mode = _ref$hour24Mode === void 0 ? false : _ref$hour24Mode,
      _ref$inner = _ref.inner,
      inner = _ref$inner === void 0 ? false : _ref$inner;
  return (
    /*#__PURE__*/
    (0, _core.css)("display:inline-block;position:absolute;color:", CLOCK_NUMBER_COLOR, ";pointer-events:none;border-radius:99px;width:", _constants.NUMBER_RADIUS_REGULAR, "px;height:", _constants.NUMBER_RADIUS_REGULAR, "px;text-align:center;line-height:", _constants.NUMBER_RADIUS_REGULAR, "px;z-index:5;font-size:", (0, _constants.getFontSize)(hour24Mode, inner), "px;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3N0eWxlcy9udW1iZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVVpRiIsImZpbGUiOiIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9zdHlsZXMvbnVtYmVycy50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNzcywganN4IH0gZnJvbSAnQGVtb3Rpb24vY29yZSdcbmltcG9ydCB7IE5VTUJFUl9SQURJVVNfUkVHVUxBUiwgZ2V0Rm9udFNpemUgfSBmcm9tICcuLi8uLi9oZWxwZXJzL2NvbnN0YW50cydcblxuY29uc3QgQ0xPQ0tfTlVNQkVSX0NPTE9SID0gJyM5OTk5OTknXG5cbmludGVyZmFjZSBQcm9wcyB7XG5cdGhvdXIyNE1vZGU/OiBib29sZWFuXG5cdGlubmVyPzogYm9vbGVhblxufVxuXG5leHBvcnQgY29uc3QgbnVtYmVyc1N0eWxlID0gKHsgaG91cjI0TW9kZSA9IGZhbHNlLCBpbm5lciA9IGZhbHNlIH06IFByb3BzKSA9PiBjc3NgXG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRjb2xvcjogJHtDTE9DS19OVU1CRVJfQ09MT1J9O1xuXHRwb2ludGVyLWV2ZW50czogbm9uZTtcblx0Ym9yZGVyLXJhZGl1czogOTlweDtcblx0d2lkdGg6ICR7TlVNQkVSX1JBRElVU19SRUdVTEFSfXB4O1xuXHRoZWlnaHQ6ICR7TlVNQkVSX1JBRElVU19SRUdVTEFSfXB4O1xuXHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdGxpbmUtaGVpZ2h0OiAke05VTUJFUl9SQURJVVNfUkVHVUxBUn1weDtcblx0ei1pbmRleDogNTtcblx0Zm9udC1zaXplOiAke2dldEZvbnRTaXplKGhvdXIyNE1vZGUsIGlubmVyKX1weDtcbmBcblxuLy8gei1pbmRleCByZXF1aXJlZCB0byBiZSBvbiB0b3Agb2YgY2xvY2toYW5kXG5leHBvcnQgY29uc3QgbnVtYmVyc1dyYXBwZXJTdHlsZSA9IGNzc2Bcblx0cG9zaXRpb246IGFic29sdXRlO1xuXHRsZWZ0OiAwO1xuXHR0b3A6IDA7XG5cdHotaW5kZXg6IDI7XG5gXG4iXX0= */"))
  );
}; // z-index required to be on top of clockhand


exports.numbersStyle = numbersStyle;
var numbersWrapperStyle = process.env.NODE_ENV === "production" ? {
  name: "av1tj5",
  styles: "position:absolute;left:0;top:0;z-index:2;"
} : {
  name: "av1tj5",
  styles: "position:absolute;left:0;top:0;z-index:2;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL3N0eWxlcy9udW1iZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCc0MiLCJmaWxlIjoiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvc3R5bGVzL251bWJlcnMudHMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjc3MsIGpzeCB9IGZyb20gJ0BlbW90aW9uL2NvcmUnXG5pbXBvcnQgeyBOVU1CRVJfUkFESVVTX1JFR1VMQVIsIGdldEZvbnRTaXplIH0gZnJvbSAnLi4vLi4vaGVscGVycy9jb25zdGFudHMnXG5cbmNvbnN0IENMT0NLX05VTUJFUl9DT0xPUiA9ICcjOTk5OTk5J1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuXHRob3VyMjRNb2RlPzogYm9vbGVhblxuXHRpbm5lcj86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGNvbnN0IG51bWJlcnNTdHlsZSA9ICh7IGhvdXIyNE1vZGUgPSBmYWxzZSwgaW5uZXIgPSBmYWxzZSB9OiBQcm9wcykgPT4gY3NzYFxuXHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0Y29sb3I6ICR7Q0xPQ0tfTlVNQkVSX0NPTE9SfTtcblx0cG9pbnRlci1ldmVudHM6IG5vbmU7XG5cdGJvcmRlci1yYWRpdXM6IDk5cHg7XG5cdHdpZHRoOiAke05VTUJFUl9SQURJVVNfUkVHVUxBUn1weDtcblx0aGVpZ2h0OiAke05VTUJFUl9SQURJVVNfUkVHVUxBUn1weDtcblx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRsaW5lLWhlaWdodDogJHtOVU1CRVJfUkFESVVTX1JFR1VMQVJ9cHg7XG5cdHotaW5kZXg6IDU7XG5cdGZvbnQtc2l6ZTogJHtnZXRGb250U2l6ZShob3VyMjRNb2RlLCBpbm5lcil9cHg7XG5gXG5cbi8vIHotaW5kZXggcmVxdWlyZWQgdG8gYmUgb24gdG9wIG9mIGNsb2NraGFuZFxuZXhwb3J0IGNvbnN0IG51bWJlcnNXcmFwcGVyU3R5bGUgPSBjc3NgXG5cdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0bGVmdDogMDtcblx0dG9wOiAwO1xuXHR6LWluZGV4OiAyO1xuYFxuIl19 */"
};
exports.numbersWrapperStyle = numbersWrapperStyle;