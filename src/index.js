import React from 'react';
import Head from './Head';
import Body from './Body';
import Foot from './Foot';
import Filtering from './Filtering';
import Pagination from './Pagination';
import request from 'superagent';

export default class DataTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data:[],
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
  
  componentWillMount(){
    if(typeof this.props.url === 'undefined'){
      throw new Error('No url prop passed, it\'s required.');
    }else if(typeof this.props.url !== 'string'){
      throw new Error('Url prop must be a string.');
    }
    if(typeof this.props.columns === 'undefined'){
      throw new Error('No columns prop passed, it\'s required.');
    }else if(Array.isArray(this.props.columns)){
      this.props.columns.forEach((column, i)=>{
        if(typeof column.name === 'undefined'){
          throw new Error('No name attribute passed in column (index '+i+'), it\'s required.');
        }
        if(typeof column.label === 'undefined'){
          console.warn('No "label" attribute passed in column named "'+column.name+'", attribute "name" used as label.');
        }
      });
    }else{
      throw new Error('Columns prop must be an Array.');
    }
    
    this.getData();
  }
  
  getData(nextPage = null, filters = [], sortBy = null){
    var url = this.props.url;
    
    url += (nextPage !== null) ? (url.indexOf('?') > -1 ? '&' : '?')+'page='+nextPage : '';
    url += (sortBy !== null) ? (url.indexOf('?') > -1 ? '&' : '?')+'sorted_column='+sortBy.column+'&sorting='+sortBy.order : '';
    Object.keys(filters).forEach((key) => {
      url += (filters[key] !== '') ? (url.indexOf('?') > -1 ? '&' : '?')+'filters['+key+']='+filters[key] : '';
    });
    
    request('GET',url).end(function(err, res){
      if(!res.ok){
        throw new Error("Error while requesting data, check your rest server.")
      }
      if(!res.body && Array.isArray(res.body)){
        throw new Error("No data found, check your rest server.")
      }
      if((res.body.current_page === null) || (res.body.last_page === null) || (res.body.from === null) || (res.body.to === null) || (res.body.total === null)){
        throw new Error("Error with paging data, check your rest server.")
      }
      this.setState({
        data: res.body.data,
        currentPage: res.body.current_page,
        lastPage: res.body.last_page,
        fromRow: res.body.from,
        toRow: res.body.to,
        totalRows: res.body.total
      });
    }.bind(this));
  }
  
  onPageChange(page){
    this.getData(page,this.state.filters,this.state.sortBy);
  }
  
  onSort(column, order){
    this.getData(this.state.currentPage,this.state.filters,{
      column: column,
      order: order
    });
    var newState = this.state;
    newState.sortBy = {
      column: column,
      order: order
    }
    this.setState(newState);
  }
  
  onFilter(column, filter){
    var newState = this.state;
    newState.filters[column] = filter;
    this.getData(this.state.currentPage,newState.filters,this.state.sortBy);
    this.setState(newState);
  }

  render(){
    return <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered">
                <Head onSort={this.onSort.bind(this)} columns={this.props.columns} />
                <Filtering onFilter={this.onFilter.bind(this)} columns={this.props.columns} i18n={(this.props.options) ? this.props.options.i18n : null} />
                <Body rows={this.state.data} columns={this.props.columns} />
                <Foot columns={this.props.columns} />
              </table>
              <Pagination
                      currentPage={this.state.currentPage}
                      lastPage={this.state.lastPage}
                      fromRow={this.state.fromRow}
                      toRow={this.state.toRow}
                      totalRows={this.state.totalRows}
                      onPageChange={this.onPageChange.bind(this)}
                      i18n={(this.props.options) ? this.props.options.i18n : null} />
           </div>;
  }

}
