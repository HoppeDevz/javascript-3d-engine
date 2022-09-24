import { initializeMatrix } from "./initializeMatrix";


// ROTATION MATRICES
// EQUATIONS:

// x' = x * cos(β) - y * sin(β)
// y' = x * sin(β) + y * cos(β)

export function makeRotationXMatrix(fTheta: number, speed: number) {


    // change coords of y and z

    const rotXmatrix = initializeMatrix(4, 4);

    // Dont change x and w values
    rotXmatrix[0][0] = 1;
    rotXmatrix[3][3] = 1;
    
    // Find new y value
    rotXmatrix[1][1] = Math.cos(fTheta * speed);
    rotXmatrix[2][1] = -Math.sin(fTheta * speed);

    // Find new z value
    rotXmatrix[1][2] = Math.sin(fTheta * speed);
    rotXmatrix[2][2] = Math.cos(fTheta * speed);

    return rotXmatrix;
}

export function makeRotationYMatrix(fTheta: number, speed: number) {


    // change coords of x and z

    const rotYmatrix = initializeMatrix(4, 4);

    // Dont change y and w values
    rotYmatrix[1][1] = 1;
    rotYmatrix[3][3] = 1;

    // Find new x value
    rotYmatrix[0][0] = Math.cos(fTheta * speed);
    rotYmatrix[2][0] = -Math.sin(fTheta * speed);
    
    // Find new z value
    rotYmatrix[0][2] = Math.sin(fTheta * speed);
    rotYmatrix[2][2] = Math.cos(fTheta * speed);

    return rotYmatrix;
}