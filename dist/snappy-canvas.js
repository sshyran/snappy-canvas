(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SnappyCanvas = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var helpers = {
    merge: function merge(dest, src) {
        for (var prop in src) {
            dest[prop] = src[prop];
        }
        return dest;
    }
};

module.exports = helpers;

},{}],2:[function(require,module,exports){
"use strict";

module.exports = require("./snappy-canvas.js");

},{"./snappy-canvas.js":3}],3:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SnappyContext2D = require("./snappy-context2d.js");

var SnappyCanvas = function SnappyCanvas(options) {
    _classCallCheck(this, SnappyCanvas);

    var canvas = options.canvas || document.createElement("canvas");
    SnappyCanvas.transformCanvas(canvas, options);
    if (options.width !== undefined) {
        canvas.width = options.width;
    }
    if (options.height !== undefined) {
        canvas.height = options.height;
    }
    return canvas;
};

SnappyCanvas.transformCanvas = function (canvas) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _scale = options.scale !== undefined ? options.scale : 1;
    var _translationX = options.translationX !== undefined ? options.translationX : 0;
    var _translationY = options.translationY !== undefined ? options.translationY : 0;
    var _scaleLineWidth = options.scaleLineWidth !== undefined ? options.scaleLineWidth : 1;
    var _resizeCanvas = options.resizeCanvas !== undefined ? options.resizeCanvas : false;

    if (options.uWidth) {
        canvas.width = options.uWidth * _scale | 0;
    }

    if (options.uHeight) {
        canvas.height = options.uHeight * _scale | 0;
    }

    canvas._rawContext2d = canvas.getContext("2d");
    canvas._snappyContext2d = new SnappyContext2D(canvas._rawContext2d);

    canvas.getContext = function (contextType) {
        if (contextType != "2d") {
            throw new Error("ValueError: SnappyCanvas only supports '2d' context type.");
        }
        return this._snappyContext2d;
    };

    canvas.translate = function (tx, ty) {
        _translationX = tx;
        _translationY = ty;
        this.render();
    };

    canvas.render = function () {
        this._snappyContext2d.render();
    };

    Object.defineProperty(canvas, "scale", {
        enumerable: true,
        configurable: false,
        get: function get() {
            return _scale;
        },
        set: function set(scale) {
            var uWidth = this.uWidth;
            var uHeight = this.uHeight;
            _scale = scale;
            if (_resizeCanvas) {
                this.width = uWidth * _scale | 0;
                this.height = uHeight * _scale | 0;
            }
            this.render();
        }
    });

    Object.defineProperty(canvas, "translationX", {
        enumerable: true,
        configurable: false,
        get: function get() {
            return _translationX;
        },
        set: function set(tx) {
            _translationX = tx;
            this.render();
        }
    });

    Object.defineProperty(canvas, "translationY", {
        enumerable: true,
        configurable: false,
        get: function get() {
            return _translationY;
        },
        set: function set(ty) {
            _translationY = ty;
            this.render();
        }
    });

    Object.defineProperty(canvas, "scaleLineWidth", {
        enumerable: true,
        configurable: false,
        get: function get() {
            return _scaleLineWidth;
        },
        set: function set(scaleLineWidth) {
            _scaleLineWidth = scaleLineWidth;
            this.render();
        }
    });

    Object.defineProperty(canvas, "resizeCanvas", {
        enumerable: true,
        configurable: false,
        get: function get() {
            return _resizeCanvas;
        },
        set: function set(resizeCanvas) {
            _resizeCanvas = resizeCanvas;
            this.render();
        }
    });

    Object.defineProperty(canvas, "uWidth", {
        enumerable: true,
        configurable: false,
        get: function get() {
            return this.width / _scale | 0;
        },
        set: function set(uWidth) {
            this.width = uWidth * _scale | 0;
            this.render();
        }
    });

    Object.defineProperty(canvas, "uHeight", {
        enumerable: true,
        configurable: false,
        get: function get() {
            return this.height / _scale | 0;
        },
        set: function set(uHeight) {
            this.height = uHeight * _scale | 0;
            this.render();
        }
    });
};

module.exports = SnappyCanvas;

},{"./snappy-context2d.js":4}],4:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var helpers = require("./helpers.js");

var SnappyContext2D = function () {
    function SnappyContext2D(context2d) {
        _classCallCheck(this, SnappyContext2D);

        Object.defineProperty(this, "_context2d", {
            enumerable: false,
            configurable: false,
            value: context2d
        });
        Object.defineProperty(this, "_drawing", {
            enumerable: false,
            configurable: false,
            value: []
        });

        function _context2dMethod() {
            for (var _len = arguments.length, call = Array(_len), _key = 0; _key < _len; _key++) {
                call[_key] = arguments[_key];
            }

            this._drawing.push(call); // jshint ignore:line
        }

        for (var prop in context2d) {
            if (typeof context2d[prop] == "function") {
                this[prop] = _context2dMethod.bind(this, prop);
            }
        }
    }

    _createClass(SnappyContext2D, [{
        key: "render",
        value: function render() {
            var _options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            var ctx = this._context2d;

            var options = {
                translationX: 0,
                translationY: 0,
                scale: 1,
                scaleLineWidth: 1
            };

            if (ctx.canvas._snappyContext2d === this) {
                options.translationX = ctx.canvas.translationX;
                options.translationY = ctx.canvas.translationY;
                options.scale = ctx.canvas.scale;
                options.scaleLineWidth = ctx.canvas.scaleLineWidth;
            }

            helpers.merge(options, _options);

            var canvasStatus = {
                translationX: options.translationX,
                translationY: options.translationY,
                scale: options.scale,
                lineWidth: options.scaleLineWidth ? Math.max(1, options.scale | 0) : 1
            };

            ctx.lineWidth = canvasStatus.lineWidth;

            var canvasStatusStack = [];
            var pathBuff = [];
            var isStroke = 0;

            // Helpers

            function _drawStack(stack) {
                var skipPath = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

                for (var i = 0; i < stack.length; i++) {
                    var operationName = stack[i][0];
                    var operationDef = operationDefs[operationName];
                    var operationFn = skipPath && operationDef && operationDef.isPath ? _operationPathStack : _operationGeneric;

                    if (operationDef) {
                        if (operationDef.fn) {
                            operationFn = operationDefs[operationName].fn;
                        }
                    } else {
                        operationFn = _operationUnimplemented;
                    }

                    operationFn.apply(undefined, [operationDef].concat(_toConsumableArray(stack[i])));
                }
            }

            function _contextOperationCall(ctx, operationName) {
                for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                    args[_key2 - 2] = arguments[_key2];
                }

                if (typeof ctx[operationName] == "function") {
                    return ctx[operationName].apply(ctx, args);
                } else {
                    ctx[operationName] = args[0];
                }
            }

            // Filters

            var _posx = function _posx(x, cs) {
                return ((x + cs.translationX) * cs.scale | 0) + cs.lineWidth * isStroke % 2 / 2;
            };
            var _posy = function _posy(y, cs) {
                return ((y + cs.translationY) * cs.scale | 0) + cs.lineWidth * isStroke % 2 / 2;
            };
            var _size = function _size(s, cs) {
                return s * cs.scale | 0;
            };
            var _nop = function _nop(v, cs) {
                return v;
            };

            // Operations

            function _operationGeneric(operation, operationName) {
                if (operation.isStroke !== undefined && operation.isStroke !== null) {
                    isStroke = operation.isStroke;
                }
                var args = [];

                for (var _len3 = arguments.length, values = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
                    values[_key3 - 2] = arguments[_key3];
                }

                for (var i = 0; i < values.length; i++) {
                    args[i] = operation.args[i](values[i], canvasStatus);
                }
                _contextOperationCall.apply(undefined, [ctx, operationName].concat(args));
            }

            function _operationPathStack(operation, operationName) {
                for (var _len4 = arguments.length, values = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
                    values[_key4 - 2] = arguments[_key4];
                }

                pathBuff.push([operationName].concat(values));
            }

            function _operationUnimplemented(operation, operationName) {
                console.warn("SnappyContext2D: the \"" + operationName + "\" operation is not implemented by SnappyCanvas. The output may be ugly!");
                ctx.save();
                ctx.translate(canvasStatus.translationX | 0, canvasStatus.translationY | 0);
                ctx.scale(canvasStatus.scale, canvasStatus.scale);

                for (var _len5 = arguments.length, values = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
                    values[_key5 - 2] = arguments[_key5];
                }

                _contextOperationCall.apply(undefined, [ctx, operationName].concat(values));
                ctx.restore();
            }

            function _operationBeginPath(operation, operationName) {
                pathBuff = [];
            }

            function _operationStroke(operation, operationName) {
                isStroke = true;
                ctx.beginPath();
                _drawStack(pathBuff, false);
                ctx.stroke();
            }

            function _operationFill(operation, operationName) {
                isStroke = false;
                ctx.beginPath();
                _drawStack(pathBuff, false);
                ctx.fill();
            }

            // Operations definition

            var operationDefs = {
                strokeRect: { isStroke: 1, args: [_posx, _posy, _size, _size] },
                fillRect: { isStroke: 0, args: [_posx, _posy, _size, _size] },

                beginPath: { fn: _operationBeginPath },
                moveTo: { isPath: true, args: [_posx, _posy] },
                lineTo: { isPath: true, args: [_posx, _posy] },
                closePath: { isPath: true },

                stroke: { fn: _operationStroke },
                fill: { fn: _operationFill }
            };

            // Let's draw

            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            _drawStack(this._drawing);
        }
    }]);

    return SnappyContext2D;
}();

module.exports = SnappyContext2D;

},{"./helpers.js":1}]},{},[2])(2)
});