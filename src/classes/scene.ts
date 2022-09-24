import { camSettings, context, HEIGHT, WIDTH } from "../index";
import { drawTriangle } from "../utils/drawFunctions";
import { makeProjectionMatrix } from "../utils/makeProjMatrix";
import { makeRotationXMatrix, makeRotationYMatrix } from "../utils/makeRotationMatrices";
import { multiply_vertex_to_4x4_matrix } from "../utils/multiply_vertex_to_4x4_matrix";
import { Model } from "./model";
import { Vector } from "./vector";

export class Scene {

    public cameraCoords: Vector;
    public cameraLookAt: Vector;

    public rendering: boolean;
    public elapsedTime: number;
    public cullingOccultFaces: boolean;
    public models: Model[];

    constructor() {

        this.cameraCoords = new Vector(0, 0, 0);
        this.cameraLookAt = new Vector(0, 0, 1);

        this.rendering = false;

        this.elapsedTime = 0.0;

        this.models = [];

        this.cullingOccultFaces = true;
    }

    public addModel(model: Model) {

        this.models.push(model);
    }

    public render() {

        if (this.rendering) return;
        this.rendering = true;

        const matProj = makeProjectionMatrix(camSettings);
    
        setInterval(() => {

            if (context)
                context.clearRect(0, 0, WIDTH, HEIGHT);

            const fTheta = 1.0 * this.elapsedTime;

            const rotx = makeRotationXMatrix(fTheta, 1.0);
            const roty = makeRotationYMatrix(fTheta, 1.5);

            for (const model of this.models) {


                for (let i = 0; i < model.verteces.length; i = i + 3) {

                    const trinagleVerteces = [
                        model.verteces[i],
                        model.verteces[i + 1],
                        model.verteces[i + 2]
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


                    // CROSS PRODUCT
                    // Nx = Ay.Bz - Az.By
                    // Ny = Az.Bx - Ax.Bz
                    // Nz = Ax.By - Ay.Bx

                    if (this.cullingOccultFaces) {


                        const firstVector = new Vector(

                            rotatedXY[1].x - rotatedXY[0].x,
                            rotatedXY[1].y - rotatedXY[0].y,
                            rotatedXY[1].z - rotatedXY[0].z,
                        );
                        const secondVector = new Vector(
    
                            rotatedXY[2].x - rotatedXY[0].x,
                            rotatedXY[2].y - rotatedXY[0].y,
                            rotatedXY[2].z - rotatedXY[0].z,
                        );
    
                        const normalToPlane = new Vector(
                            (firstVector.yOffset * secondVector.zOffset) - (firstVector.zOffset * secondVector.yOffset),
                            (firstVector.zOffset * secondVector.xOffset) - (firstVector.xOffset * secondVector.zOffset),
                            (firstVector.xOffset * secondVector.yOffset) - (firstVector.yOffset * secondVector.xOffset)
                        );

                        const cameraToPointVector = new Vector(
                            rotatedXY[1].x - this.cameraCoords.xOffset,
                            rotatedXY[1].y - this.cameraCoords.yOffset,
                            rotatedXY[1].z - this.cameraCoords.zOffset,
                        );

                        const similarityBetweenVectors = 
                            (cameraToPointVector.xOffset * normalToPlane.xOffset) +
                            (cameraToPointVector.yOffset * normalToPlane.yOffset) +
                            (cameraToPointVector.zOffset * normalToPlane.zOffset)

                        if (similarityBetweenVectors < 0.0) {

                            const projected = [ 
                                multiply_vertex_to_4x4_matrix(rotatedXY[0], matProj),
                                multiply_vertex_to_4x4_matrix(rotatedXY[1], matProj),
                                multiply_vertex_to_4x4_matrix(rotatedXY[2], matProj)
                            ]
            
                            projected[0].x *= WIDTH / 2;
                            projected[0].y *= HEIGHT / 2;
            
                            projected[1].x *= WIDTH / 2;
                            projected[1].y *= HEIGHT / 2;
            
                            projected[2].x *= WIDTH / 2;
                            projected[2].y *= HEIGHT / 2;
            
                            drawTriangle(projected[0], projected[1], projected[2], model.lineColor);
                        }

                    } else {


                        const projected = [ 
                            multiply_vertex_to_4x4_matrix(rotatedXY[0], matProj),
                            multiply_vertex_to_4x4_matrix(rotatedXY[1], matProj),
                            multiply_vertex_to_4x4_matrix(rotatedXY[2], matProj)
                        ]
        
                        projected[0].x *= WIDTH / 2;
                        projected[0].y *= HEIGHT / 2;
        
                        projected[1].x *= WIDTH / 2;
                        projected[1].y *= HEIGHT / 2;
        
                        projected[2].x *= WIDTH / 2;
                        projected[2].y *= HEIGHT / 2;
        
                        drawTriangle(projected[0], projected[1], projected[2], model.lineColor);
                    }
                }
            }

            this.elapsedTime += 0.01;
            
        }, 20);
    }
}