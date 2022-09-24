define(["require", "exports", "../index", "./initializeMatrix"], function (require, exports, index_1, initializeMatrix_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeProjectionMatrix = void 0;
    function makeProjectionMatrix(cameraSettings) {
        const projectionMatrix = (0, initializeMatrix_1.initializeMatrix)(4, 4);
        // PROJECTION MATRIX
        /*
            [x,y,z,w] x |  a.f 0   0  0 |
                        |   0  f   0  0 |    ->  [a.x.f, y.f, z.z + (-z), z ]
                        |   0  0   z  1 |
                        |   0  0  -z  0 |
        */
        const fAspectRatio = index_1.HEIGHT / index_1.WIDTH;
        const fFovRad = 1.0 / Math.tan(cameraSettings.fFov * 0.5 / 180.0 * Math.PI);
        projectionMatrix[0][0] = fAspectRatio * fFovRad;
        projectionMatrix[1][1] = fFovRad;
        projectionMatrix[2][2] = cameraSettings.fFar / (cameraSettings.fFar - cameraSettings.fNear);
        projectionMatrix[2][3] = 1;
        projectionMatrix[3][2] = (cameraSettings.fFar * cameraSettings.fNear / (cameraSettings.fFar - cameraSettings.fNear)) * -1;
        return projectionMatrix;
    }
    exports.makeProjectionMatrix = makeProjectionMatrix;
});
