import React from 'react';
import './item-list.component.scss';
import SingleItemList from './single-item-list.component';
import CategoryNavbar from '../category-navbar/category-navbar.component'
import {Helmet} from "react-helmet";
//Class ItemList
class ItemList extends React.Component{
    constructor(props){
        super(props);
        //Set ElementList and Category states
        this.state = {
            elementList: [],
            categories: []
        }
        //Function that gets the props of the selected product and sends it to the parent component to share with the product view (Avoiding an unnecessary API request)
        function getProps(_props) {  this.props.productHandle(_props) }
        //Get URL Search Parameter and execute the API request
        var query = new URLSearchParams(window.location.search).get('search');
        var url = "http://localhost:3333/api/items?q="+query;
        fetch(url)
        .then( results => {
            return results.json();
        })
        .then( data => {
            this.setState({
                categories : data.categories
            }) 
            //Create a list of item components
            var data_list = data.items.map((data_mapped) => {
                return(
                    <SingleItemList 
                        category={data.categories}
                        key={data_mapped.id} 
                        id={data_mapped.id} 
                        title={data_mapped.title}
                        price={data_mapped.price}
                        picture={data_mapped.picture}
                        condition={data_mapped.condition}
                        free_shipping={data_mapped.free_shipping}
                        getProps = {getProps.bind(this)}
                    />
                )
            })
            //Perform a change of element list state
            this.setState({elementList : data_list});
        })
        //Send categories to parent element
        //this.props.categoriesHandle(this.state.categories);
    }
    //Render Function
    render() {
        //Obter lista de categorias
        var currentCategory = this.state.categories;
        var querySearch = new URLSearchParams(window.location.search).get('search');
        return(
            <React.Fragment>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Mercado Libre - Busqueda por {querySearch}</title>
                </Helmet>
                <div className="container-fluid item_list_nav">
                    <div className="row">
                        <div className="col-10 offset-1 pl-0">
                            <CategoryNavbar category={currentCategory} />
                        </div>
                        <div className="item_list_body col-10 offset-1">
                            {this.state.elementList}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default ItemList;