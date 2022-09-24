define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    class Model {
        constructor(verteces, lineColor) {
            this.lineColor = lineColor || "black";
            this.verteces = verteces;
        }
    }
    exports.Model = Model;
});
