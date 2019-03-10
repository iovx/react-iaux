"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpResponse = /** @class */ (function () {
    function HttpResponse() {
        this.header = [];
    }
    return HttpResponse;
}());
exports.HttpResponse = HttpResponse;
var HttpUtil = /** @class */ (function () {
    function HttpUtil() {
    }
    HttpUtil.request = function (request) {
        return new HttpResponse();
    };
    HttpUtil.get = function (url, params) {
        return new HttpResponse();
    };
    HttpUtil.head = function (url, params) {
        return new HttpResponse();
    };
    HttpUtil.delete = function (url, params) {
        return new HttpResponse();
    };
    HttpUtil.put = function (url, params) {
        return new HttpResponse();
    };
    HttpUtil.post = function (url, params) {
        return new HttpResponse();
    };
    return HttpUtil;
}());
exports.default = HttpUtil;
//# sourceMappingURL=Http.js.map