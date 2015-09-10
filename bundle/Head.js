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
		cursor: 'pointer'
	},
	sortIcon: {
		position: 'absolute',
		right: '11px',
		top: '11px'
	}
};

var Head = (function (_React$Component) {
	_inherits(Head, _React$Component);

	function Head(props) {
		_classCallCheck(this, Head);

		_get(Object.getPrototypeOf(Head.prototype), 'constructor', this).call(this, props);
		this.state = {
			sortedAsc: null,
			column: null
		};
	}

	_createClass(Head, [{
		key: 'toggleSorting',
		value: function toggleSorting(column) {
			var newState = {};
			if (this.state.column !== column.name) {
				newState.sortedAsc = true;
				newState.column = column.name;
			} else {
				newState.column = this.state.column;
				newState.sortedAsc = this.state.sortedAsc ? false : true;
			}
			this.setState(newState);
			this.props.onSort(newState.column, newState.sortedAsc ? 'asc' : 'desc');
		}
	}, {
		key: 'render',
		value: function render() {
			var _this = this;

			return _react2['default'].createElement(
				'thead',
				null,
				_react2['default'].createElement(
					'tr',
					null,
					this.props.columns.map(function (column, i) {
						if (column.renderer || !column.sorting) {
							return _react2['default'].createElement(
								'th',
								{ key: i },
								column.label || column.name
							);
						}
						return _react2['default'].createElement(
							'th',
							{
								key: i,
								onClick: _this.toggleSorting.bind(_this, column),
								style: styles.th },
							_react2['default'].createElement(
								'span',
								null,
								column.label || column.name
							),
							_react2['default'].createElement('span', { style: styles.sortIcon, className: column.name == _this.state.column ? _this.state.sortedAsc ? 'fa fa-sort-asc' : 'fa fa-sort-desc' : 'fa fa-sort' })
						);
					})
				)
			);
		}
	}]);

	return Head;
})(_react2['default'].Component);

exports['default'] = Head;
module.exports = exports['default'];