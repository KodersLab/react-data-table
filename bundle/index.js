'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Head = require('./Head');

var _Head2 = _interopRequireDefault(_Head);

var _Body = require('./Body');

var _Body2 = _interopRequireDefault(_Body);

var _Foot = require('./Foot');

var _Foot2 = _interopRequireDefault(_Foot);

var _Filtering = require('./Filtering');

var _Filtering2 = _interopRequireDefault(_Filtering);

var _Pagination = require('./Pagination');

var _Pagination2 = _interopRequireDefault(_Pagination);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var DataTable = (function (_React$Component) {
  _inherits(DataTable, _React$Component);

  function DataTable(props) {
    _classCallCheck(this, DataTable);

    _get(Object.getPrototypeOf(DataTable.prototype), 'constructor', this).call(this, props);
    this.state = {
      data: [],
      filters: [],
      sortBy: {
        column: '',
        order: ''
      },
      currentPage: 0,
      lastPage: 0,
      fromRow: 0,
      toRow: 0,
      totalRows: 0
    };
  }

  _createClass(DataTable, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (typeof this.props.url === 'undefined') {
        throw new Error('No url prop passed, it\'s required.');
      } else if (typeof this.props.url !== 'string') {
        throw new Error('Url prop must be a string.');
      }
      if (typeof this.props.columns === 'undefined') {
        throw new Error('No columns prop passed, it\'s required.');
      } else if (Array.isArray(this.props.columns)) {
        this.props.columns.forEach(function (column, i) {
          if (typeof column.name === 'undefined') {
            throw new Error('No name attribute passed in column (index ' + i + '), it\'s required.');
          }
          if (typeof column.label === 'undefined') {
            console.warn('No "label" attribute passed in column named "' + column.name + '", attribute "name" used as label.');
          }
        });
      } else {
        throw new Error('Columns prop must be an Array.');
      }

      this.getData();
    }
  }, {
    key: 'getData',
    value: function getData() {
      var nextPage = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var filters = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
      var sortBy = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var url = this.props.url;

      url += nextPage !== null ? (url.indexOf('?') > -1 ? '&' : '?') + 'page=' + nextPage : '';
      url += sortBy !== null ? (url.indexOf('?') > -1 ? '&' : '?') + 'sorted_column=' + sortBy.column + '&sorting=' + sortBy.order : '';
      Object.keys(filters).forEach(function (key) {
        url += filters[key] !== '' ? (url.indexOf('?') > -1 ? '&' : '?') + 'filters[' + key + ']=' + filters[key] : '';
      });

      (0, _superagent2['default'])('GET', url).end((function (err, res) {
        if (!res.ok) {
          throw new Error("Error while requesting data, check your rest server.");
        }
        if (!res.body && Array.isArray(res.body)) {
          throw new Error("No data found, check your rest server.");
        }
        if (res.body.current_page === null || res.body.last_page === null || res.body.from === null || res.body.to === null || res.body.total === null) {
          throw new Error("Error with paging data, check your rest server.");
        }
        this.setState({
          data: res.body.data,
          currentPage: res.body.current_page,
          lastPage: res.body.last_page,
          fromRow: res.body.from,
          toRow: res.body.to,
          totalRows: res.body.total
        });
      }).bind(this));
    }
  }, {
    key: 'onPageChange',
    value: function onPageChange(page) {
      this.getData(page, this.state.filters, this.state.sortBy);
    }
  }, {
    key: 'onSort',
    value: function onSort(column, order) {
      this.getData(this.state.currentPage, this.state.filters, {
        column: column,
        order: order
      });
      var newState = this.state;
      newState.sortBy = {
        column: column,
        order: order
      };
      this.setState(newState);
    }
  }, {
    key: 'onFilter',
    value: function onFilter(column, filter) {
      var newState = this.state;
      newState.filters[column] = filter;
      this.getData(this.state.currentPage, newState.filters, this.state.sortBy);
      this.setState(newState);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2['default'].createElement(
        'div',
        { className: 'table-responsive' },
        _react2['default'].createElement(
          'table',
          { className: 'table table-striped table-hover table-bordered' },
          _react2['default'].createElement(_Head2['default'], { onSort: this.onSort.bind(this), columns: this.props.columns }),
          _react2['default'].createElement(_Filtering2['default'], { onFilter: this.onFilter.bind(this), columns: this.props.columns, i18n: this.props.options ? this.props.options.i18n : null }),
          _react2['default'].createElement(_Body2['default'], { rows: this.state.data, columns: this.props.columns }),
          _react2['default'].createElement(_Foot2['default'], { columns: this.props.columns })
        ),
        _react2['default'].createElement(_Pagination2['default'], {
          currentPage: this.state.currentPage,
          lastPage: this.state.lastPage,
          fromRow: this.state.fromRow,
          toRow: this.state.toRow,
          totalRows: this.state.totalRows,
          onPageChange: this.onPageChange.bind(this),
          i18n: this.props.options ? this.props.options.i18n : null })
      );
    }
  }]);

  return DataTable;
})(_react2['default'].Component);

exports['default'] = DataTable;
module.exports = exports['default'];