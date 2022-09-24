define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initializeMatrix = void 0;
    function initializeMatrix(rows, columns) {
        const matrix = [];
        for (let i = 0; i < rows; i++) {
            matrix[i] = [];
            for (let j = 0; j < columns; j++) {
                matrix[i][j] = 0;
            }
        }
        return matrix;
    }
    exports.initializeMatrix = initializeMatrix;
});
