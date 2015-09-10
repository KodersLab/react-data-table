import React from 'react';
import _lodashGet from 'lodash.get';

export default React.createClass({
  render: function() {
    return <tr 
            onClick={(this.props.options && typeof this.props.options.onClick === 'function') ? this.props.options.onClick.bind(this,this.props.row) : ''} 
            style={(this.props.options && typeof this.props.options.onClick === 'function') ? {cursor:'pointer'} : {}}>
            {this.props.columns.map((column, i) => {
              if(column.renderer){
                return <td key={i}><column.renderer column={column} row={this.props.row} /></td>;
              }else if(column.mutator){
                return <td key={i}>{column.mutator(_lodashGet(this.props.row, column.name, '-'))}</td>;
              }else if(_lodashGet(this.props.row, column.name, false)){
                return <td key={i}>{_lodashGet(this.props.row, column.name, '-')}</td>;
              }else{
                return <td key={i}>-</td>;
              }
            })}
          </tr>
  }
});
