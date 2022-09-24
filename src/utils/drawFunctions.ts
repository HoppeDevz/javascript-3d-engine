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

export function drawTriangle(vertex1: Vertex, vertex2: Vertex, vertex3: Vertex, color?: string) {
            
    draw(vertex1,  vertex2, color);
    draw(vertex1,  vertex3, color);
    draw(vertex3,  vertex2, color);
}