import React from 'react';

export default class Foot extends React.Component {
	render(){
		return <tfoot>
              	<tr role="row">
					{this.props.columns.map(function(column, i) {
						return <th key={i}>{column.label || column.name}</th>;
					})}
              	</tr>
               </tfoot>;
	}
}