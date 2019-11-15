import React from 'react';
import './item-preview.component.scss';
import CategoryNavbar from '../category-navbar/category-navbar.component';
import {Helmet} from "react-helmet";

class ItemPreview extends React.Component {
    constructor(props){
        super(props);
        this.parent_productData_return = this.props.data || {
            "id": "",
            "title": "",
                "price": {
                            "currency": "",
                            "amount": "",
                            "decimals": ""
                },
            "picture": "",
            "condition": "",
            "free_shipping": ""
        };
        this.state = {
            data : this.parent_productData_return
        }
        if(!!!this.state.data.id){   
            fetch("http://localhost:3333/api/items/"+window.location.pathname.replace('/items/',''))
            .then(response => {
                return response.json()
            })
            .then( data => {
                this.setState({
                    data: data.items[0]
                });
                
            })
            .catch( e => console.log(e) )
        }
    }
    render() {
        console.log(this.props)
        var thumbnail = this.state.data.picture;
        return(
            <React.Fragment>
                <Helmet>
                    <title> {this.state.data.title} -  en Mercado Libre</title>
                </Helmet>
                <div className="container-fluid item_list_nav">
                    <div className="row">
                        <div className="col-10 offset-1 pl-0">
                            <CategoryNavbar category={this.props.data.category} />
                        </div>
                    </div>
                    <div className="row product-line">
                        <div className="col-10 offset-1 product-preview row">
                           <div className="thumbnail col-md-8" style={
                               {
                                backgroundImage: 'url('+thumbnail+')'
                                }
                            }></div> 

                            <div className="product-detail col-md-3">
                                <p className="state_of_product">Nuevo - 254 vendidos</p>
                                <h1 className="title">{this.state.data.title}</h1>
                                <h2 className="price">$ {this.state.data.price.amount}</h2>
                                <a className="btn btn-primary shipping-btn">Comprar</a>
                            </div>
                            <div className="product-description col-md-8">
                                <h3>Descripcion de producto</h3>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}
export default ItemPreview;