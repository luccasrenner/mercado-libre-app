import React, { Component } from 'react';
import { BrowserRouter as Router, Route  } from "react-router-dom";
//requisition of components
import  SearchBox  from './components/search-box/search-box.component'
import ItemList from './components/item-list/item-list.component';
import ItemPreview from './components/item-preview/item-preview.component';
//App Component
class App extends Component {
  constructor(){
    super();
    this.state ={
      search: '',
      product: '',
      categories: []
    };
    //Function bind
    this.searchHandle = this.searchHandle.bind(this);
    this.categoriesHandle = this.categoriesHandle.bind(this); 
  }
  //Function to keep a product date and avoid unnecessary API Requests
  searchHandle(_props){ this.setState({ search: _props }) }
  //function to persist the status of the category bar
  categoriesHandle(_props){ this.setState({ categories: _props }) }
  //Render with React Router and state persistence functions
  render(){
    return (
        <Router>
          <Route path="/" component={ () =>  <SearchBox searchHandle={this.searchHandle }  inputValue={this.state.search} />  } />
          <Route exact path="/items" component={() => <ItemList categoriesHandle={this.categoriesHandle} productHandle={this.productHandle} />}   />
          <Route path="/items/:id" component={ () =>  <ItemPreview  categories={this.state.categories} data={this.state.product} /> } />
        </Router>
    );
  }
}
export default App;
