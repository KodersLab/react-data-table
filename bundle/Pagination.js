'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var preventDefault = function preventDefault(e) {
  return e.preventDefault();
};

var styles = {
  container: {
    padding: 0
  },
  pagination: {
    margin: 0,
    float: 'right'
  },
  cols: {
    padding: 0
  },
  links: {
    cursor: 'pointer'
  }
};

exports['default'] = _react2['default'].createClass({
  displayName: 'Pagination',

  handlePageChange: function handlePageChange(pageNumber, e) {
    e.preventDefault;
    this.props.onPageChange(pageNumber);
  },
  render: function render() {
    var buttons = [],
        isCurrent,
        btnEvent;
    var currentPage = this.props.currentPage,
        lastPage = this.props.lastPage;

    var diff = 3,
        start = Math.max(currentPage - diff, 0),
        end = Math.min(start + 5, lastPage);

    if (lastPage >= 5 && end >= lastPage) {
      start = lastPage - 5;
    }

    for (var i = start; i < end; i++) {
      isCurrent = i + 1 === currentPage;
      if (isCurrent) {
        btnEvent = preventDefault;
      } else {
        btnEvent = this.handlePageChange.bind(this, i + 1);
      }
      buttons.push(_react2['default'].createElement(
        'li',
        { key: i, className: isCurrent ? 'active paginate_button' : 'paginate_button' },
        _react2['default'].createElement(
          'a',
          { style: styles.links, onClick: btnEvent },
          i + 1
        )
      ));
    }

    var isNotFirst = currentPage > 1;
    var isNotLast = currentPage < lastPage;

    var nextHandler = preventDefault;
    var prevHandler = preventDefault;
    var firstHandler = preventDefault;
    var lastHandler = preventDefault;

    if (isNotFirst) {
      prevHandler = this.handlePageChange.bind(this, currentPage - 1);
      firstHandler = this.handlePageChange.bind(this, 0);
    }
    if (isNotLast) {
      nextHandler = this.handlePageChange.bind(this, currentPage + 1);
      lastHandler = this.handlePageChange.bind(this, lastPage);
    }

    return _react2['default'].createElement(
      'div',
      { style: styles.container, className: 'container-fluid' },
      _react2['default'].createElement(
        'div',
        { style: styles.cols, className: 'col-sm-5' },
        this.props.i18n ? this.props.i18n.from + ' ' : 'Showing ',
        this.props.fromRow,
        this.props.i18n ? ' ' + this.props.i18n.to + ' ' : ' to ',
        this.props.toRow,
        this.props.i18n ? ' ' + this.props.i18n.of + ' ' : ' of ',
        this.props.totalRows,
        this.props.i18n ? ' ' + this.props.i18n.entries : ' entries.'
      ),
      _react2['default'].createElement(
        'div',
        { style: styles.cols, className: 'col-sm-7' },
        _react2['default'].createElement(
          'ul',
          { style: styles.pagination, className: 'pagination' },
          _react2['default'].createElement(
            'li',
            { className: !isNotFirst ? 'disabled' : '' },
            _react2['default'].createElement('a', { style: !isNotFirst ? { cursor: 'not-allowed' } : { cursor: 'pointer' }, className: 'fa fa-angle-double-left', onClick: firstHandler })
          ),
          _react2['default'].createElement(
            'li',
            { className: !isNotFirst ? 'disabled' : '' },
            _react2['default'].createElement('a', { style: !isNotFirst ? { cursor: 'not-allowed' } : { cursor: 'pointer' }, className: 'fa fa-angle-left', onClick: prevHandler })
          ),
          buttons,
          _react2['default'].createElement(
            'li',
            { className: !isNotLast ? 'disabled' : '' },
            _react2['default'].createElement('a', { style: !isNotLast ? { cursor: 'not-allowed' } : { cursor: 'pointer' }, className: 'fa fa-angle-right', onClick: nextHandler })
          ),
          _react2['default'].createElement(
            'li',
            { className: !isNotLast ? 'disabled' : '' },
            _react2['default'].createElement('a', { style: !isNotLast ? { cursor: 'not-allowed' } : { cursor: 'pointer' }, className: 'fa fa-angle-double-right', onClick: lastHandler })
          )
        )
      )
    );
  }
});
module.exports = exports['default'];