import { CameraSettings, CustomCameraSettings } from "./@types/cameraSettings";
import { Color } from "./classes/color";
import { Material } from "./classes/material";
import { Model } from "./classes/model";
import { Scene } from "./classes/scene";
import { CubeVerteces } from "./data/cube";


export let context: CanvasRenderingContext2D | undefined;
export let WIDTH: number;
export let HEIGHT: number;
export let elapsedTime = 0.0;

export let camSettings: CameraSettings = {
    fNear: 0.1,
    fFar: 1000.0,
    fFov: 90.0
}

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

    const scene = new Scene();

    const cubeColor = new Color(255, 200, 0, 255);
    const cubeMaterial = new Material(cubeColor);
    const cube = new Model(CubeVerteces, cubeMaterial);

    scene.addModel(cube);

    scene.render();
}

const canvas = document.querySelector("#viewport") as any;

if (canvas) {

    console.log("Initializing...");

    initialize(canvas.getContext('2d'), 1024, 768);
}
