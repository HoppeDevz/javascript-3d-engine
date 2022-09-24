import { Vertex } from "./vertex";

export class Model {

    public lineColor: string;
    public verteces: Vertex[];

    constructor(verteces: Vertex[], lineColor?: string) {

        this.lineColor = lineColor || "black";
        this.verteces = verteces;
    }
}