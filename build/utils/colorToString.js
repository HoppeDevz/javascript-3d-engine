define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.colorToString = void 0;
    function colorToString(color) {
        return `rgba(${color.r},${color.g},${color.b},${color.a})`;
    }
    exports.colorToString = colorToString;
});
