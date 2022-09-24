import { Color } from "./color";

export class Material {

    public color: Color;

    constructor(color?: Color) {

        this.color = color || { r: 255, g: 0, b: 0, a: 255 };
    }
}