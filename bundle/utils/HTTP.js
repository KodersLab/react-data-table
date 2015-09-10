'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _EventEmitter2 = require('./EventEmitter');

var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);

var HTTP = (function (_EventEmitter) {
    _inherits(HTTP, _EventEmitter);

    function HTTP() {
        _classCallCheck(this, HTTP);

        _get(Object.getPrototypeOf(HTTP.prototype), 'constructor', this).apply(this, arguments);

        this._pending = 0;
    }

    _createClass(HTTP, [{
        key: 'ajax',
        value: function ajax(method, url) {
            var _this = this;

            var body = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
            var type = arguments.length <= 3 || arguments[3] === undefined ? 'json' : arguments[3];

            method = method.toUpperCase();

            return new Promise(function (resolve, reject) {
                var params = _qs2['default'].stringify(body);

                url = url + (url.indexOf('?') > -1 ? '&' : '?') + '_randomCacheBuster=' + Math.random();

                var xhr = null;
                try {
                    xhr = new XMLHttpRequest();
                } catch (e1) {
                    try {
                        xhr = new window.ActiveXObject('Msxml3.XMLHTTP');
                    } catch (e2) {
                        try {
                            xhr = new window.ActiveXObject('Msxml2.XMLHTTP.6.0');
                        } catch (e3) {
                            try {
                                xhr = new window.ActiveXObject('Msxml2.XMLHTTP.3.0');
                            } catch (e4) {
                                try {
                                    xhr = new window.ActiveXObject('Msxml2.XMLHTTP');
                                } catch (e5) {
                                    try {
                                        xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
                                    } catch (e6) {
                                        throw 'Unable to start an XMLHttpRequest since it\'s not supported.';
                                    }
                                }
                            }
                        }
                    }
                }

                xhr.open(method, url, true);
                if (method === 'POST') {
                    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                }

                _this[type + 'PreRequest'](xhr, method);

                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(_this[type + 'ParseData'](xhr.responseText));
                        } else {
                            reject(xhr);
                        }
                        _this._pending--;
                        _this.emit('ajaxEnd', _this._pending);
                        _this.emit('ajaxChanged', _this._pending);
                    }
                };

                _this._pending++;
                _this.emit('ajaxStart', _this._pending);
                _this.emit('ajaxChanged', _this._pending);
                if (method === 'POST') {
                    xhr.send(params);
                } else {
                    xhr.send();
                }
            });
        }
    }, {
        key: 'get',
        value: function get(url) {
            return this.ajax('GET', url);
        }
    }, {
        key: 'delete',
        value: function _delete(url) {
            return this.ajax('DELETE', url);
        }
    }, {
        key: 'post',
        value: function post(url) {
            var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return this.ajax('POST', url, data);
        }
    }, {
        key: 'jsonPreRequest',
        value: function jsonPreRequest(xhr) {
            xhr.setRequestHeader('Accept', 'application/json');
        }
    }, {
        key: 'jsonParseData',
        value: function jsonParseData(data) {
            return JSON.parse(data);
        }
    }]);

    return HTTP;
})(_EventEmitter3['default']);

exports['default'] = new HTTP();
module.exports = exports['default'];