import React from 'react';

var styles = {
	th: {
		position:'relative',
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
		padding: '10px',
	}
}

export default class Filtering extends React.Component {
	onChange(column,e){
		this.props.onFilter(column.name, e.target.value);
	}	
	
	render(){
		return <thead>
				<tr>
					{this.props.columns.map(function(column, i) {
						if((column.renderer) || (column.search === false)){
							return <th key={i} style={{cursor:'not-allowed'}}></th>;
						}
						return <th style={styles.th} key={i}>
							<input style={styles.input} placeholder={(this.props.i18n.searchPlaceholderPrefix || 'Search for')+' '+(column.label.toLowerCase() || column.name)+'...'} onChange={this.onChange.bind(this,column)} type="text" />
						</th>;
					}.bind(this))}
				</tr>
			   </thead>;
	}
}