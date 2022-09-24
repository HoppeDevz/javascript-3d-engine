define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Material = void 0;
    class Material {
        constructor(color) {
            this.color = color || { r: 255, g: 0, b: 0, a: 255 };
        }
    }
    exports.Material = Material;
});
