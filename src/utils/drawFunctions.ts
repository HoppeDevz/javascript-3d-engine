import { context, WIDTH, HEIGHT } from "../index";
import { Vertex } from "../classes/vertex";

export function draw(vx1: Vertex, vx2: Vertex, color: string = "red") {

    if (!context) throw new Error("Context must be defined!");

    context.strokeStyle = color;

    context.beginPath();
    context.moveTo(WIDTH / 2 + vx1.x, HEIGHT / 2 - vx1.y);
    context.lineTo(WIDTH / 2 + vx2.x, HEIGHT / 2 - vx2.y);
    context.stroke();
}

export function fill(color: string = "red", ...vn: Vertex[]) {

    if (!context) throw new Error("Context must be defined!");

    const firstVector = vn[0];
    vn.shift();

    context.strokeStyle = color;
    context.fillStyle = color;

    context.beginPath();
    context.moveTo(WIDTH / 2 + firstVector.x, HEIGHT / 2 - firstVector.y);

    for (const vertex of vn) {

        context.lineTo(WIDTH / 2 + vertex.x, HEIGHT / 2 - vertex.y);
    }

    context.fill();
} 

export function drawTriangle(vertex1: Vertex, vertex2: Vertex, vertex3: Vertex, color?: string) {
            
    draw(vertex1,  vertex2, color);
    draw(vertex1,  vertex3, color);
    draw(vertex3,  vertex2, color);
}

export function fillTriangle(vertex1: Vertex, vertex2: Vertex, vertex3: Vertex, color?: string) {

    fill(color, vertex1, vertex2, vertex3);
}