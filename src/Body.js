import React from 'react';
import Row from './Row';

export default class Body extends React.Component {
	render(){
		return <tbody>
					{this.props.rows.map((row, i) => {
						return <Row row={row} columns={this.props.columns} key={i} />;
					})}
			   </tbody>;
	}
}