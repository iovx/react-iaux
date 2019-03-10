"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var moment = require("moment");
var CurrentTime = /** @class */ (function (_super) {
    __extends(CurrentTime, _super);
    function CurrentTime() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.timer = null;
        _this.state = {
            now: Date.now(),
        };
        return _this;
    }
    CurrentTime.prototype.tick = function () {
        var _this = this;
        this.timer = window.setTimeout(function () {
            _this.setState({ now: Date.now() }, function () {
                _this.tick();
            });
        }, 1000);
    };
    CurrentTime.prototype.render = function () {
        var now = this.state.now;
        var format = this.props.format;
        return (React.createElement("div", null, moment(now).format(format)));
    };
    CurrentTime.defaultProps = {
        format: 'YYYY-MM-DD HH:mm',
    };
    return CurrentTime;
}(React.PureComponent));
exports.default = CurrentTime;
//# sourceMappingURL=CurrentTime.js.map
