import { Pyramid } from "./model/pyramid.model.js";
const vert = require("./shader/01/vert.shader.01.glsl");
const frag = require("./shader/01/frag.shader.01.glsl");

const canvas = document.createElement("canvas");
const gl = canvas.getContext("webgl2");
document.body.appendChild(canvas);

function createShader(gl, type, source) {
  const shader = gl.createShader(type);

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  return shader;
}

function createFragShader(gl, source) {
  return createShader(gl, gl.FRAGMENT_SHADER, source);
}

function createVertShader(gl, source) {
  return createShader(gl, gl.VERTEX_SHADER, source);
}

function createShaderProgram(gl, vertShader, fragShader) {
  const program = gl.createProgram();
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);

  return program;
}

/** PREPROCESSING / INITIALIZATION */
// create shaders
const vertexShader = createVertShader(gl, vert);
const fragmentShader = createFragShader(gl, frag);

// create shader program
const program = createShaderProgram(gl, vertexShader, fragmentShader);

// get reference to attribute a_position from shader program
const positionAttribute = gl.getAttribLocation(program, "a_position");

// create buffer
const positionBuffer = gl.createBuffer();

// bind buffer
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// three 2D points
const positions = [0, 0, 0, 0.5, 0.7, 0];

// copy data to buffer as 32bit floating point numbers
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

/** RENDERING */
// Clear the canvas
gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);

// Tell it to use our program (pair of shaders)
gl.useProgram(program);

gl.enableVertexAttribArray(positionAttribute);

// Bind the position buffer.
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
const size = 2; // 2 components per iteration
const type = gl.FLOAT; // the data is 32bit floats
const normalize = false; // don't normalize the data
const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
const offset = 0; // start at the beginning of the buffer
gl.vertexAttribPointer(positionBuffer, size, type, normalize, stride, offset);

var primitiveType = gl.TRIANGLES;
var start = 0;
var count = 3;
gl.drawArrays(primitiveType, start, count);
