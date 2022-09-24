import { Vertex } from "../classes/vertex";

// CUBE VERTECES
export const CubeVerteces: Vertex[] = [
    
    // SOUTH
    { x: 0.0, y: 0.0, z: 0.0 }, { x: 0.0, y: 1.0, z: 0.0 }, { x: 1.0, y: 1.0, z: 0.0 },
    { x: 0.0, y: 0.0, z: 0.0 }, { x: 1.0, y: 1.0, z: 0.0 }, { x: 1.0, y: 0.0, z: 0.0 },

    
    // EAST
    { x: 1.0, y: 0.0, z: 0.0 }, { x: 1.0, y: 1.0, z: 0.0 }, { x: 1.0, y: 1.0, z: 1.0 },
    { x: 1.0, y: 0.0, z: 0.0 }, { x: 1.0, y: 1.0, z: 1.0 }, { x: 1.0, y: 0.0, z: 1.0 },


    // NORTH
    { x: 1.0, y: 0.0, z: 1.0 }, { x: 1.0, y: 1.0, z: 1.0 }, { x: 0.0, y: 1.0, z: 1.0 },
    { x: 1.0, y: 0.0, z: 1.0 }, { x: 0.0, y: 1.0, z: 1.0 }, { x: 0.0, y: 0.0, z: 1.0 },


    // WEST    
    { x: 0.0, y: 0.0, z: 1.0 }, { x: 0.0, y: 1.0, z: 1.0 }, { x: 0.0, y: 1.0, z: 0.0 },
    { x: 0.0, y: 0.0, z: 1.0 }, { x: 0.0, y: 1.0, z: 0.0 }, { x: 0.0, y: 0.0, z: 0.0 },


    // TOP
    { x: 0.0, y: 1.0, z: 0.0 }, { x: 0.0, y: 1.0, z: 1.0 }, { x: 1.0, y: 1.0, z: 1.0 },
    { x: 0.0, y: 1.0, z: 0.0 }, { x: 1.0, y: 1.0, z: 1.0 }, { x: 1.0, y: 1.0, z: 0.0 },


    // BOTTOM
    { x: 1.0, y: 0.0, z: 1.0 }, { x: 0.0, y: 0.0, z: 1.0 }, { x: 0.0, y: 0.0, z: 0.0 },
    { x: 1.0, y: 0.0, z: 1.0 }, { x: 0.0, y: 0.0, z: 0.0 }, { x: 1.0, y: 0.0, z: 0.0 }


]
