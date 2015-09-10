import React from 'react';

var styles = {
	th: {
		position: 'relative',
		cursor:'pointer'
	},
	sortIcon: {
		position: 'absolute',
		right: '11px',
		top: '11px'
	}
};

export default class Head extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			sortedAsc: null,
			column: null
		};
	}
	
	toggleSorting(column){
		var newState ={};
		if(this.state.column !== column.name){
			newState.sortedAsc = true;
			newState.column = column.name;
		}else{
			newState.column = this.state.column;
			newState.sortedAsc = this.state.sortedAsc ? false : true;
		}
		this.setState(newState);
		this.props.onSort(newState.column,newState.sortedAsc ? 'asc' : 'desc');
	}
	
	render(){
		return <thead>
				<tr>
					{this.props.columns.map((column,i) => {
						if(column.renderer || !column.sorting){
							return <th key={i}>{column.label || column.name}</th>;
						}
						return <th 
									key={i} 
									onClick={this.toggleSorting.bind(this,column)}
									style={styles.th}>
										<span>{column.label || column.name}</span>
										<span style={styles.sortIcon} className={(column.name==this.state.column)? (this.state.sortedAsc ? 'fa fa-sort-asc' : 'fa fa-sort-desc') : 'fa fa-sort'}></span>
									</th>;
					})}
				</tr>
			   </thead>;
	}
}