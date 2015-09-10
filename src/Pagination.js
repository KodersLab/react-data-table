import React from 'react';
var preventDefault = e => e.preventDefault();

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

export default React.createClass({
  handlePageChange:function(pageNumber,e){
    e.preventDefault;
    this.props.onPageChange(pageNumber);
  },
  render: function() {
    var buttons = [], isCurrent, btnEvent;
    var currentPage = this.props.currentPage, lastPage = this.props.lastPage;

    var diff = 3, start = Math.max(currentPage - diff, 0), end = Math.min(start + 5, lastPage);

    if (lastPage >= 5 && end >= lastPage) {
      start = lastPage - 5;
    }

    for (var i = start; i < end; i++) {
      isCurrent = i+1 === currentPage;
      if (isCurrent) {
        btnEvent = preventDefault;
      } else {
        btnEvent = this.handlePageChange.bind(this, i+1);
      }
      buttons.push(
        <li key={i} className={isCurrent ? 'active paginate_button' : 'paginate_button'}>
          <a style={styles.links} onClick={btnEvent}>{i+1}</a>
        </li>
      );
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
    if(isNotLast) {
      nextHandler = this.handlePageChange.bind(this, currentPage + 1);
      lastHandler = this.handlePageChange.bind(this, lastPage);
    }

    return <div style={styles.container} className="container-fluid">
      <div style={styles.cols} className="col-sm-5">
          {(this.props.i18n) ? this.props.i18n.from+' ' : 'Showing '}
          {this.props.fromRow}
          {(this.props.i18n) ? ' '+this.props.i18n.to+' ' : ' to '}
          {this.props.toRow} 
          {(this.props.i18n) ? ' '+this.props.i18n.of+' ' : ' of '}
          {this.props.totalRows}
          {(this.props.i18n) ? ' '+this.props.i18n.entries : ' entries.'}
      </div>
      <div style={styles.cols} className="col-sm-7">
          <ul style={styles.pagination} className="pagination">
            <li className={!isNotFirst ? 'disabled' : ''}>
              <a style={(!isNotFirst) ? {cursor:'not-allowed'} : {cursor:'pointer'}} className="fa fa-angle-double-left" onClick={firstHandler}></a>
            </li>
            <li className={!isNotFirst ? 'disabled' : ''}>
              <a style={(!isNotFirst) ? {cursor:'not-allowed'} : {cursor:'pointer'}} className="fa fa-angle-left" onClick={prevHandler}></a>
            </li>
            {buttons}
            <li className={!isNotLast ? 'disabled' : ''}>
              <a style={(!isNotLast) ? {cursor:'not-allowed'} : {cursor:'pointer'}} className="fa fa-angle-right" onClick={nextHandler}></a>
            </li>
            <li className={!isNotLast ? 'disabled' : ''}>
              <a style={(!isNotLast) ? {cursor:'not-allowed'} : {cursor:'pointer'}} className="fa fa-angle-double-right" onClick={lastHandler}></a>
            </li>
          </ul>
      </div>
    </div>
  }
});
