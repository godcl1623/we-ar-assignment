"use strict";
exports.__esModule = true;
var canvas_1 = require("./elements/canvas");
var main = document.querySelector('#root');
var canvasInstance = new canvas_1["default"]();
var canvas = canvasInstance.makeCanvas();
main === null || main === void 0 ? void 0 : main.appendChild(canvas);
