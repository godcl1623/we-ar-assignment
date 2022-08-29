"use strict";
exports.__esModule = true;
var Canvas = /** @class */ (function () {
    function Canvas() {
        var _this = this;
        this.canvasElement = document.createElement('canvas');
        this.makeCanvas = function () {
            _this.canvasElement.style.width = Canvas.CANVAS_WIDTH;
            _this.canvasElement.style.height = Canvas.CANVAS_HEIGHT;
            return _this.canvasElement;
        };
    }
    Canvas.CANVAS_WIDTH = '1000px';
    Canvas.CANVAS_HEIGHT = '500px';
    return Canvas;
}());
exports["default"] = Canvas;
