define(["require", "exports", "./classes/color", "./classes/material", "./classes/model", "./classes/scene", "./data/cube"], function (require, exports, color_1, material_1, model_1, scene_1, cube_1) {
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
        const cubeColor = new color_1.Color(255, 200, 0, 255);
        const cubeMaterial = new material_1.Material(cubeColor);
        const cube = new model_1.Model(cube_1.CubeVerteces, cubeMaterial);
        scene.addModel(cube);
        scene.render();
    }
    exports.initialize = initialize;
    const canvas = document.querySelector("#viewport");
    if (canvas) {
        console.log("Initializing...");
        initialize(canvas.getContext('2d'), 800, 600);
    }
});
