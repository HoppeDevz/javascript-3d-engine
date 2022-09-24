define(["require", "exports", "./material"], function (require, exports, material_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Model = void 0;
    class Model {
        constructor(verteces, material) {
            const modelMaterial = material ? material : new material_1.Material();
            this.material = modelMaterial;
            this.verteces = verteces;
        }
    }
    exports.Model = Model;
});
