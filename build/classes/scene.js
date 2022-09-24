define(["require", "exports", "../index", "../utils/colorToString", "../utils/drawFunctions", "../utils/makeProjMatrix", "../utils/makeRotationMatrices", "../utils/multiply_vertex_to_4x4_matrix", "./vector"], function (require, exports, index_1, colorToString_1, drawFunctions_1, makeProjMatrix_1, makeRotationMatrices_1, multiply_vertex_to_4x4_matrix_1, vector_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scene = void 0;
    class Scene {
        constructor() {
            this.lightDirection = new vector_1.Vector(0, 0, -1);
            this.cameraCoords = new vector_1.Vector(0, 0, 0);
            this.cameraLookAt = new vector_1.Vector(0, 0, 1);
            this.rendering = false;
            this.elapsedTime = 0.0;
            this.models = [];
            this.cullingOccultFaces = true;
        }
        addModel(model) {
            this.models.push(model);
        }
        render() {
            if (this.rendering)
                return;
            this.rendering = true;
            const matProj = (0, makeProjMatrix_1.makeProjectionMatrix)(index_1.camSettings);
            setInterval(() => {
                if (index_1.context)
                    index_1.context.clearRect(0, 0, index_1.WIDTH, index_1.HEIGHT);
                const fTheta = 1.0 * this.elapsedTime;
                const rotx = (0, makeRotationMatrices_1.makeRotationXMatrix)(fTheta, 1.0);
                const roty = (0, makeRotationMatrices_1.makeRotationYMatrix)(fTheta, 1.5);
                for (const model of this.models) {
                    for (let i = 0; i < model.verteces.length; i = i + 3) {
                        const trinagleVerteces = [
                            model.verteces[i],
                            model.verteces[i + 1],
                            model.verteces[i + 2]
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
                        // CROSS PRODUCT
                        // Nx = Ay.Bz - Az.By
                        // Ny = Az.Bx - Ax.Bz
                        // Nz = Ax.By - Ay.Bx
                        if (this.cullingOccultFaces) {
                            const firstVector = new vector_1.Vector(rotatedXY[1].x - rotatedXY[0].x, rotatedXY[1].y - rotatedXY[0].y, rotatedXY[1].z - rotatedXY[0].z);
                            const secondVector = new vector_1.Vector(rotatedXY[2].x - rotatedXY[1].x, rotatedXY[2].y - rotatedXY[1].y, rotatedXY[2].z - rotatedXY[1].z);
                            const cameraToPointVector = new vector_1.Vector(((rotatedXY[0].x + rotatedXY[1].x + rotatedXY[2].x) / 3) - this.cameraCoords.xOffset, ((rotatedXY[0].y + rotatedXY[1].y + rotatedXY[2].y) / 3) - this.cameraCoords.yOffset, ((rotatedXY[0].z + rotatedXY[1].z + rotatedXY[2].z) / 3) - this.cameraCoords.zOffset);
                            const normalToPlane = new vector_1.Vector((firstVector.yOffset * secondVector.zOffset) - (firstVector.zOffset * secondVector.yOffset), (firstVector.zOffset * secondVector.xOffset) - (firstVector.xOffset * secondVector.zOffset), (firstVector.xOffset * secondVector.yOffset) - (firstVector.yOffset * secondVector.xOffset));
                            const similarityBetweenVectors = (cameraToPointVector.xOffset * normalToPlane.xOffset) +
                                (cameraToPointVector.yOffset * normalToPlane.yOffset) +
                                (cameraToPointVector.zOffset * normalToPlane.zOffset);
                            if (similarityBetweenVectors < 0) {
                                const similarityLight = (this.lightDirection.xOffset * normalToPlane.xOffset) +
                                    (this.lightDirection.yOffset * normalToPlane.yOffset) +
                                    (this.lightDirection.zOffset * normalToPlane.zOffset);
                                const pixel_bw = Math.ceil(similarityLight * 13);
                                let subtract = 150 - (10 * pixel_bw);
                                const clonedMaterial = JSON.parse(JSON.stringify(model.material));
                                clonedMaterial.color.r = model.material.color.r - subtract < 0 ? 0 : model.material.color.r - subtract;
                                clonedMaterial.color.g = model.material.color.g - subtract < 0 ? 0 : model.material.color.g - subtract;
                                clonedMaterial.color.g = model.material.color.b - subtract < 0 ? 0 : model.material.color.b - subtract;
                                if (clonedMaterial.color.r == 0 && clonedMaterial.color.g == 0 && clonedMaterial.color.b == 0) {
                                    console.log(similarityLight, subtract);
                                }
                                const projected = [
                                    (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(rotatedXY[0], matProj),
                                    (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(rotatedXY[1], matProj),
                                    (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(rotatedXY[2], matProj)
                                ];
                                projected[0].x *= index_1.WIDTH / 2;
                                projected[0].y *= index_1.HEIGHT / 2;
                                projected[1].x *= index_1.WIDTH / 2;
                                projected[1].y *= index_1.HEIGHT / 2;
                                projected[2].x *= index_1.WIDTH / 2;
                                projected[2].y *= index_1.HEIGHT / 2;
                                (0, drawFunctions_1.fillTriangle)(projected[0], projected[1], projected[2], (0, colorToString_1.colorToString)(clonedMaterial.color));
                            }
                        }
                        else {
                            const projected = [
                                (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(rotatedXY[0], matProj),
                                (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(rotatedXY[1], matProj),
                                (0, multiply_vertex_to_4x4_matrix_1.multiply_vertex_to_4x4_matrix)(rotatedXY[2], matProj)
                            ];
                            projected[0].x *= index_1.WIDTH / 2;
                            projected[0].y *= index_1.HEIGHT / 2;
                            projected[1].x *= index_1.WIDTH / 2;
                            projected[1].y *= index_1.HEIGHT / 2;
                            projected[2].x *= index_1.WIDTH / 2;
                            projected[2].y *= index_1.HEIGHT / 2;
                            (0, drawFunctions_1.drawTriangle)(projected[0], projected[1], projected[2], (0, colorToString_1.colorToString)(model.material.color));
                        }
                    }
                }
                this.elapsedTime += 0.01;
            }, 20);
        }
    }
    exports.Scene = Scene;
});
