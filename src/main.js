import { Pyramid } from "./model/pyramid.model.js";

const p = new Pyramid();

const canvas = document.createElement("canvas");

const gl = canvas.getContext("webgl");
document.body.appendChild(canvas);
