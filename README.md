react-data-table
=======
A very simple DataTable component for React that load data via ajax (made for Laravel Paginator).

### Installation
```
npm install react-data-table
```

### Usage example
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

### Documentation
Coming soon...