"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRandColor() {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    var a = Math.round(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + "," + a + ")";
}
exports.getRandColor = getRandColor;
function hex2Rgba(alpha) {
    if (alpha === void 0) { alpha = true; }
    return '#23a';
}
exports.hex2Rgba = hex2Rgba;
//# sourceMappingURL=color.js.map