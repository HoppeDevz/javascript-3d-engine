define(["require", "exports", "../index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.drawTriangle = exports.draw = void 0;
    function draw(vx1, vx2, color = "red") {
        if (!index_1.context)
            throw new Error("Context must be defined!");
        index_1.context.strokeStyle = color;
        index_1.context.beginPath();
        index_1.context.moveTo(index_1.WIDTH / 2 + vx1.x, index_1.HEIGHT / 2 - vx1.y);
        index_1.context.lineTo(index_1.WIDTH / 2 + vx2.x, index_1.HEIGHT / 2 - vx2.y);
        index_1.context.stroke();
    }
    exports.draw = draw;
    function drawTriangle(vertex1, vertex2, vertex3, color) {
        draw(vertex1, vertex2, color);
        draw(vertex1, vertex3, color);
        draw(vertex3, vertex2, color);
    }
    exports.drawTriangle = drawTriangle;
});
