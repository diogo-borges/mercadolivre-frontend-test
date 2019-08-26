import React, {Component} from 'react';
import './App.scss';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Search from './components/Search/Search';
import ProductList from './components/ProductList/ProductList';
import ProductDetail from './components/ProductDetail/ProductDetail';
const numeral = require('numeral');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
    numeral.register('locale', 'es_AR', {
      delimiters: {
          thousands: '.',
          decimal: ','
      },
      currency: {
          symbol: '$'
      }
    });
    numeral.locale('es_AR');
}

render(){
  return (
    <Router>
      <div>
        <Search />
        <Route exact path="/items/:id" component={ProductDetail} />
        <Route exact path="/items" component={ProductList} />
      </div>
    </Router>
  )
}
}

export default App;
