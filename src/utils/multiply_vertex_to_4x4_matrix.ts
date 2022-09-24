import { Vertex } from "../classes/vertex";

export function multiply_vertex_to_4x4_matrix(vx: Vertex, mtx: number[][]) {

    const newVx: Vertex = { x: 0.0, y:0.0, z:0.0 };

    newVx.x = (vx.x * mtx[0][0]) + (vx.y * mtx[1][0]) + (vx.z * mtx[2][0]) + mtx[3][0];
    newVx.y = (vx.x * mtx[0][1]) + (vx.y * mtx[1][1]) + (vx.z * mtx[2][1]) + mtx[3][1];
    newVx.z = (vx.x * mtx[0][2]) + (vx.y * mtx[1][2]) + (vx.z * mtx[2][2]) + mtx[3][2];

    const w = (vx.x * mtx[0][3]) + (vx.y * mtx[1][3]) + (vx.z * mtx[2][3]) + mtx[3][3];

    if (w != 0) {

        newVx.x /= w;
        newVx.y /= w;
        newVx.z /= w;

        return newVx;
    }

    return vx;
}