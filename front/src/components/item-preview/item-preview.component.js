import React from 'react';
import './item-preview.component.scss';
import CategoryNavbar from '../category-navbar/category-navbar.component';
import {Helmet} from "react-helmet";
//ItemPreview class
class ItemPreview extends React.Component {
    constructor(props){
        super(props);
        this.id = window.location.pathname.replace('/items/','');
        this.state = {
            id: "",
            title: "",
            category: [],
            price: {
                currency: "",
                amount: "",
                decimals: "",
            },
            picture: "",
            condition: "",
            free_shipping: "",
            sold_quantity: "",
            description: ""
        }
    }
    //Get the api data from the product preview
    componentWillMount(){
        fetch(`http://localhost:3333/api/items/${this.id}`)
        .then( jsonData => jsonData.json() )
        .then( data => {
            this.setState({
                title: data.title,
                category: data.categories,
                price: {
                    currency: data.price.currency,
                    amount: data.price.amount,
                    decimals: data.price.decimals
                },
                picture: data.picture[0].url,
                condition: data.condition,
                free_shipping: data.free_shipping,
                sold_quantity: data.sold_quantity,
                description: data.description
            });
        } )
        .catch( console.log )
    }
    render() {
        var thumbnail = this.state.picture;
        return(
            <React.Fragment>
                <Helmet>
                    <title> {this.state.title} -  en Mercado Libre</title>
                </Helmet>
                <div className="container-fluid item_list_nav">
                    <div className="row">
                        <div className="col-10 offset-1 pl-0">
                            <CategoryNavbar category={this.state.category} />
                        </div>
                    </div>
                    <div className="row product-line">
                        <div className="col-10 offset-1 product-preview row">
                           <div className="thumbnail col-md-8" style={{backgroundImage: 'url('+thumbnail+')'}}></div> 
                            <div className="product-detail col-md-3">
                                <p className="state_of_product">Nuevo - 254 vendidos</p>
                                <h1 className="title">{this.state.title}</h1>
                                <h2 className="price">$ {this.state.price.amount}</h2>
                                <a className="btn btn-primary shipping-btn">Comprar</a>
                            </div>
                            <div className="product-description col-md-8">
                                <h3>Descripcion de producto</h3>
                                <p> {this.state.description} </p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}
export default ItemPreview;