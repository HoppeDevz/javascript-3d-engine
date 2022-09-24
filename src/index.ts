import { CameraSettings, CustomCameraSettings } from "./@types/cameraSettings";
import { Model } from "./classes/model";
import { Triangle } from "./classes/triangle";
import { CubeVerteces } from "./data/cube";
import { drawTriangle } from "./utils/drawFunctions";
import { makeProjectionMatrix } from "./utils/makeProjMatrix";
import { makeRotationXMatrix, makeRotationYMatrix } from "./utils/makeRotationMatrices";
import { multiply_vertex_to_4x4_matrix } from "./utils/multiply_vertex_to_4x4_matrix";
import { showMatrix } from "./utils/showMatrix";


export let context: CanvasRenderingContext2D | undefined;
export let WIDTH: number;
export let HEIGHT: number;
export let elapsedTime = 0.0;

export let camSettings: CameraSettings = {
    fNear: 0.1,
    fFar: 1000.0,
    fFov: 90.0
}

function mainThread() {

    const cube = new Model(CubeVerteces);
    const matProj = makeProjectionMatrix(camSettings);
    
    setInterval(() => {

        if (context)
            context.clearRect(0, 0, WIDTH, HEIGHT);

        const fTheta = 1.0 * elapsedTime;

        const rotx = makeRotationXMatrix(fTheta, 1.0);
        const roty = makeRotationYMatrix(fTheta, 1.5);

        for (let i = 0; i < cube.verteces.length; i = i + 3) {

            const trinagleVerteces = [
                cube.verteces[i],
                cube.verteces[i + 1],
                cube.verteces[i + 2]
            ];

            const rotatedX = [
                multiply_vertex_to_4x4_matrix(trinagleVerteces[0], rotx),
                multiply_vertex_to_4x4_matrix(trinagleVerteces[1], rotx),
                multiply_vertex_to_4x4_matrix(trinagleVerteces[2], rotx),
            ]

            const rotatedXY = [
                multiply_vertex_to_4x4_matrix(rotatedX[0], roty),
                multiply_vertex_to_4x4_matrix(rotatedX[1], roty),
                multiply_vertex_to_4x4_matrix(rotatedX[2], roty),
            ]

            rotatedXY[0].z += 3.0;
            rotatedXY[1].z += 3.0;
            rotatedXY[2].z += 3.0;

            const projected = [ 
                multiply_vertex_to_4x4_matrix(rotatedXY[0], matProj),
                multiply_vertex_to_4x4_matrix(rotatedXY[1], matProj),
                multiply_vertex_to_4x4_matrix(rotatedXY[2], matProj)
            ]

            const camLookAt = { x:0.0, y:0.0, z:1.0 };

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

export function initialize(ctx: CanvasRenderingContext2D, width: number, height: number, cameraSettings?: CustomCameraSettings) {

    if (cameraSettings) {

        camSettings = { 
            ...camSettings,
            fNear: cameraSettings.fNear,
            fFar: cameraSettings.fFar,
            fFov: cameraSettings.fFov
        }
    }

    context = ctx;

    context.strokeStyle = 'black';
    context.lineWidth = 3;

    WIDTH = width;
    HEIGHT = height;

    // START MAIN THREAD
    mainThread();
    // drawTriangle({x:0.0, y:0.0, z:0.0}, {x:100.0, y:100.0, z:0.0}, {x:0.0, y:100.0, z:0.0});
}

const canvas = document.querySelector("#viewport") as any;

if (canvas) {

    console.log("Initializing...");

    initialize(canvas.getContext('2d'), 1024, 768);
}
