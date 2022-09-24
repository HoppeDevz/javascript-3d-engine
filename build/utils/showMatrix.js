define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.showMatrix = void 0;
    function showMatrix(matrix) {
        for (let i = 0; i < matrix.length; i++) {
            let rowStr = "";
            for (let j = 0; j < matrix[i].length; j++) {
                rowStr += matrix[i][j].toFixed(2) + " ";
            }
            console.log(rowStr + "\n");
        }
    }
    exports.showMatrix = showMatrix;
});
