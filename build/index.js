define(["require", "exports", "./classes/model", "./data/cube", "./utils/drawFunctions", "./utils/makeProjMatrix", "./utils/makeRotationMatrices", "./utils/multiply_vertex_to_4x4_matrix"], function (require, exports, model_1, cube_1, drawFunctions_1, makeProjMatrix_1, makeRotationMatrices_1, multiply_vertex_to_4x4_matrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.initialize = exports.camSettings = exports.elapsedTime = exports.HEIGHT = exports.WIDTH = exports.context = void 0;
    exports.elapsedTime = 0.0;
    exports.camSettings = {
        fNear: 0.1,
        fFar: 1000.0,
        fFov: 90.0
    };
    function mainThread() {
        const cube = new model_1.Model(cube_1.CubeVerteces);
        const matProj = (0, makeProjMatrix_1.makeProjectionMatrix)(exports.camSettings);
        setInterval(() => {
            if (exports.context)
                exports.context.clearRect(0, 0, exports.WIDTH, exports.HEIGHT);
            const fTheta = 1.0 * exports.elapsedTime;
            const rotx = (0, makeRotationMatrices_1.makeRotationXMatrix)(fTheta, 1.0);
            const roty = (0, makeRotationMatrices_1.makeRotationYMatrix)(fTheta, 1.5);
            for (let i = 0; i < cube.verteces.length; i = i + 3) {
                const trinagleVerteces = [
                    cube.verteces[i],
                    cube.verteces[i + 1],
                    cube.verteces[i + 2]
                ];
                const rotatedX = [
                    (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(trinagleVerteces[0], rotx),
                    (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(trinagleVerteces[1], rotx),
                    (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(trinagleVerteces[2], rotx),
                ];
                const rotatedXY = [
                    (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(rotatedX[0], roty),
                    (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(rotatedX[1], roty),
                    (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(rotatedX[2], roty),
                ];
                rotatedXY[0].z += 3.0;
                rotatedXY[1].z += 3.0;
                rotatedXY[2].z += 3.0;
                const projected = [
                    (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(rotatedXY[0], matProj),
                    (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(rotatedXY[1], matProj),
                    (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(rotatedXY[2], matProj)
                ];
                const camLookAt = { x: 0.0, y: 0.0, z: 1.0 };
                projected[0].x *= exports.WIDTH / 2;
                projected[0].y *= exports.HEIGHT / 2;
                projected[1].x *= exports.WIDTH / 2;
                projected[1].y *= exports.HEIGHT / 2;
                projected[2].x *= exports.WIDTH / 2;
                projected[2].y *= exports.HEIGHT / 2;
                (0, drawFunctions_1.drawTriangle)(projected[0], projected[1], projected[2]);
            }
            exports.elapsedTime += 0.01;
        }, 20);
    }
    /*
    function mainThread()  {
    
        const projectionMatrix = makeProjectionMatrix(camSettings);
    
        showMatrix(projectionMatrix);
    
        setInterval(() => {
    
            if (context)
                context.clearRect(0, 0, WIDTH, HEIGHT);
    
            const fTheta = 1.0 * elapsedTime;
            const rotXmatrix = makeRotationXMatrix(fTheta, 1.0);
            const rotYmatrix = makeRotationXMatrix(fTheta, 1.5);
    
            const cube = new Model( JSON.parse(JSON.stringify(CubeVerteces)) );
    
            for (let i = 0; i < cube.verteces.length - 1; i = i + 3) {
    
                const cubeVerteces = JSON.parse(JSON.stringify(cube.verteces))
    
                const triangle = new Triangle([
                    cubeVerteces[i],
                    cubeVerteces[i + 1],
                    cubeVerteces[i + 2],
                ]);
    
                const rotatedX = [
    
                    multiply_vertex_to_4x4_matrix(triangle.verteces[0], rotationXmatrix),
                    multiply_vertex_to_4x4_matrix(triangle.verteces[1], rotationXmatrix),
                    multiply_vertex_to_4x4_matrix(triangle.verteces[2], rotationXmatrix)
                ]
    
                const rotatedXY = [
    
                    multiply_vertex_to_4x4_matrix(rotatedX[0], rotationYmatrix),
                    multiply_vertex_to_4x4_matrix(rotatedX[1], rotationYmatrix),
                    multiply_vertex_to_4x4_matrix(rotatedX[2], rotationYmatrix)
                ]
    
    
                rotatedXY[0].z += 3;
                rotatedXY[1].z += 3;
                rotatedXY[2].z += 3;
    
                const projected = [
    
                    multiply_vertex_to_4x4_matrix(rotatedXY[0], projectionMatrix),
                    multiply_vertex_to_4x4_matrix(rotatedXY[1], projectionMatrix),
                    multiply_vertex_to_4x4_matrix(rotatedXY[2], projectionMatrix)
                ]
    
                projected[0].x *= WIDTH / 2;
                projected[0].y *= HEIGHT / 2;
    
                projected[1].x *= WIDTH / 2;
                projected[1].y *= HEIGHT / 2;
    
                projected[2].x *= WIDTH / 2;
                projected[2].y *= HEIGHT / 2;
    
                drawTriangle(projected[0], projected[1], projected[2]);
            }
            
    
            elapsedTime += 0.01;
    
        }, 20);
    }
    */
    function initialize(ctx, width, height, cameraSettings) {
        if (cameraSettings) {
            exports.camSettings = Object.assign(Object.assign({}, exports.camSettings), { fNear: cameraSettings.fNear, fFar: cameraSettings.fFar, fFov: cameraSettings.fFov });
        }
        exports.context = ctx;
        exports.context.strokeStyle = 'black';
        exports.context.lineWidth = 3;
        exports.WIDTH = width;
        exports.HEIGHT = height;
        // START MAIN THREAD
        mainThread();
        // drawTriangle({x:0.0, y:0.0, z:0.0}, {x:100.0, y:100.0, z:0.0}, {x:0.0, y:100.0, z:0.0});
    }
    exports.initialize = initialize;
    const canvas = document.querySelector("#viewport");
    if (canvas) {
        console.log("Initializing...");
        initialize(canvas.getContext('2d'), 1024, 768);
    }
});
