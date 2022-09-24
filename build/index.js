define(["require", "exports", "./classes/model", "./classes/scene", "./data/cube"], function (require, exports, model_1, scene_1, cube_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initialize = exports.camSettings = exports.elapsedTime = exports.HEIGHT = exports.WIDTH = exports.context = void 0;
    exports.elapsedTime = 0.0;
    exports.camSettings = {
        fNear: 0.1,
        fFar: 1000.0,
        fFov: 90.0
    };
    function initialize(ctx, width, height, cameraSettings) {
        if (cameraSettings) {
            exports.camSettings = Object.assign(Object.assign({}, exports.camSettings), { fNear: cameraSettings.fNear, fFar: cameraSettings.fFar, fFov: cameraSettings.fFov });
        }
        exports.context = ctx;
        exports.context.strokeStyle = 'black';
        exports.context.lineWidth = 3;
        exports.WIDTH = width;
        exports.HEIGHT = height;
        const scene = new scene_1.Scene();
        const cube = new model_1.Model(cube_1.CubeVerteces);
        cube.lineColor = "orange";
        scene.addModel(cube);
        scene.render();
    }
    exports.initialize = initialize;
    const canvas = document.querySelector("#viewport");
    if (canvas) {
        console.log("Initializing...");
        initialize(canvas.getContext('2d'), 1024, 768);
    }
});
