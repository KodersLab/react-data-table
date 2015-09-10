'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodashGet2 = require('lodash.get');

var _lodashGet3 = _interopRequireDefault(_lodashGet2);

exports['default'] = _react2['default'].createClass({
  displayName: 'Row',

  render: function render() {
    var _this = this;

    return _react2['default'].createElement(
      'tr',
      {
        onClick: this.props.options && typeof this.props.options.onClick === 'function' ? this.props.options.onClick.bind(this, this.props.row) : '',
        style: this.props.options && typeof this.props.options.onClick === 'function' ? { cursor: 'pointer' } : {} },
      this.props.columns.map(function (column, i) {
        if (column.renderer) {
          return _react2['default'].createElement(
            'td',
            { key: i },
            _react2['default'].createElement(column.renderer, { column: column, row: _this.props.row })
          );
        } else if (column.mutator) {
          return _react2['default'].createElement(
            'td',
            { key: i },
            column.mutator((0, _lodashGet3['default'])(_this.props.row, column.name, '-'))
          );
        } else if ((0, _lodashGet3['default'])(_this.props.row, column.name, false)) {
          return _react2['default'].createElement(
            'td',
            { key: i },
            (0, _lodashGet3['default'])(_this.props.row, column.name, '-')
          );
        } else {
          return _react2['default'].createElement(
            'td',
            { key: i },
            '-'
          );
        }
      })
    );
  }
});
module.exports = exports['default'];