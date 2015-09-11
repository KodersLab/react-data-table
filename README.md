react-data-table
=======
A very simple DataTable component for React that load data via ajax (made for Laravel Paginator).

Warning! Docs are not 100% complete!

### Table of Contents

- [Installation](#installation)
- [Quick example](#quick-example)
- [Dependencies](#dependencies)
- [Component props](#component-props)
- [Mutators](#mutators)
- [Renderers](#renderers)
  
### Installation
```
npm install react-data-table
```

### Quick example
```jsx
import React from 'react';
import DataTable from 'react-data-table';

var options = {
    i18n: {
        from: 'Risultati da',
        to: 'a',
        of: 'di',
        entries: 'totali.'
    }
};

var columns = [
    {
        name: 'name',
        label: 'Nome',
        sorting: true
    },
    {
        name: 'code',
        label: 'Codice',
        sorting: true
    },
    {
        name: 'price',
        label: 'Prezzo',
        sorting: true,
        mutator: function(price){
            return '€ '+price;
        }
    }
];


React.render(<DataTable url="/products" options={options} columns={columns}></DataTable>, document.getElementById('table'));
```

### Dependencies

This component need [Bootstrap](http://getbootstrap.com/) (table styles) and [FontAwesome](https://fortawesome.github.io/Font-Awesome/) (sorting icons).

### Component props

You can pass 3 props to react-data-table:

* url

    This prop is required, and wants the url string of your api endpoint.
* columns

    Array of objects representing the table columns. Each object can have:
    * name
    
    Name of the column. react-data-table use this property to take the correct values of the column from datas.
    * label
    
    This is the label for the column. (you don't say?)
    * sorting
    
    If this property is false, sorting functions for the column are disabled. Default: false.
    * [mutator](#mutators)
    * [renderer](#renderers)
    
* options (Object)

    * i18n
        * from: 'Showing',
        * to: 'to',
        * of: 'of',
        * entries: 'entries.',
        * searchPlaceholderPrefix: 'Search for'
        
        Translate strings of pagination and search inputs. 
        
        ####Todo
        
        Replace from, to, of, entries with one property like this `pagination: 'Showing %a to %b of %c entires.';`

### Mutators

Have you ever had to add the currency symbol at a price arrived from your database? With a mutator you can do this!

```javascript
{
    name: 'price',
    label: 'Price',
    sorting: true,
    mutator: function(value){
        return '€ '+value;
    }
}
```
Easy!

### Renderers

Do you want to insert a button in your table? Or do you want to add a computed column? Let's do it!

```javascript
/*
 * Creating two React components
 */
class ButtonRenderer extends React.Component {
    logProps(){
        console.log(this.props.row,this.props.column);
    }
    
    render() {
        return <button onClick={this.logProps.bind(this)}>Test Button</button>;
    }
}

class ComputedRenderer extends React.Component {    
    render() {
        return this.props.row.name+' costs only € '+this.props.row.price+'!';
    }
}

var columns = [
    {
        name: 'name',
        label: 'Name',
        sorting: true
    },
    {
        name: 'price',
        label: 'Price',
        sorting: true,
        mutator: function (value) {
            return '€ ' + value;
        }
    },
    {
        name: 'button',
        label: 'Test button!',
        renderer: ButtonRenderer //Passing components to the column
    },
    {
        name: 'computed',
        label: 'How much is it?',
        renderer: ComputedRenderer //Passing components to the column
    }
];
```

In your Renderer component props are passed row and column data.