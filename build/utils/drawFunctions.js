define(["require", "exports", "../index"], function (require, exports, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fillTriangle = exports.drawTriangle = exports.fill = exports.draw = void 0;
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
    function fill(color = "red", ...vn) {
        if (!index_1.context)
            throw new Error("Context must be defined!");
        const firstVector = vn[0];
        vn.shift();
        index_1.context.strokeStyle = color;
        index_1.context.fillStyle = color;
        index_1.context.beginPath();
        index_1.context.moveTo(index_1.WIDTH / 2 + firstVector.x, index_1.HEIGHT / 2 - firstVector.y);
        for (const vertex of vn) {
            index_1.context.lineTo(index_1.WIDTH / 2 + vertex.x, index_1.HEIGHT / 2 - vertex.y);
        }
        index_1.context.fill();
    }
    exports.fill = fill;
    function drawTriangle(vertex1, vertex2, vertex3, color) {
        draw(vertex1, vertex2, color);
        draw(vertex1, vertex3, color);
        draw(vertex3, vertex2, color);
    }
    exports.drawTriangle = drawTriangle;
    function fillTriangle(vertex1, vertex2, vertex3, color) {
        fill(color, vertex1, vertex2, vertex3);
    }
    exports.fillTriangle = fillTriangle;
});
