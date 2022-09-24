import { Material } from "./material";
import { Vertex } from "./vertex";

export class Model {

    public material: Material;
    public verteces: Vertex[];

    constructor(verteces: Vertex[], material?: Material) {

        const modelMaterial = material ? material : new Material();

        this.material = modelMaterial;
        this.verteces = verteces;
    }
}