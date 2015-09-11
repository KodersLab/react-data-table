'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var styles = {
	th: {
		position: 'relative',
		padding: 0,
		margin: 0
	},
	input: {
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		position: 'relative',
		width: '100%',
		border: 'none',
		outline: 'none',
		padding: '10px'
	}
};

var Filtering = (function (_React$Component) {
	_inherits(Filtering, _React$Component);

	function Filtering() {
		_classCallCheck(this, Filtering);

		_get(Object.getPrototypeOf(Filtering.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Filtering, [{
		key: 'onChange',
		value: function onChange(column, e) {
			this.props.onFilter(column.name, e.target.value);
		}
	}, {
		key: 'render',
		value: function render() {
			return _react2['default'].createElement(
				'thead',
				null,
				_react2['default'].createElement(
					'tr',
					null,
					this.props.columns.map((function (column, i) {
						if (column.renderer || column.search === false) {
							return _react2['default'].createElement('th', { key: i, style: { cursor: 'not-allowed' } });
						}
						return _react2['default'].createElement(
							'th',
							{ style: styles.th, key: i },
							_react2['default'].createElement('input', { style: styles.input, placeholder: (this.props.i18n.searchPlaceholderPrefix || 'Search for') + ' ' + (column.label.toLowerCase() || column.name) + '...', onChange: this.onChange.bind(this, column), type: 'text' })
						);
					}).bind(this))
				)
			);
		}
	}]);

	return Filtering;
})(_react2['default'].Component);

exports['default'] = Filtering;
module.exports = exports['default'];