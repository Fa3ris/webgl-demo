import { Triangle } from "./triangle.model";
import { SimpleModel } from "./simple.model";
import { Renderer } from "../render/renderer";

export class Pyramid {
  constructor() {
    const vertices = [
      [0.0, -0.25, -0.5],
      [0.0, 0.25, 0.0],
      [0.5, -0.25, 0.25],
      [-0.5, -0.25, 0.25],
    ];

    const triangle1 = new Triangle([vertices[2], vertices[1], vertices[3]]);
    const triangle2 = new Triangle([vertices[3], vertices[1], vertices[0]]);
    const triangle3 = new Triangle([vertices[0], vertices[1], vertices[2]]);
    const triangle4 = new Triangle([vertices[0], vertices[2], vertices[3]]);

    this.model = new SimpleModel("simple");
    this.model.triangles = [triangle1, triangle2, triangle3, triangle4];

    this.renderer = new Renderer();
  }
}
