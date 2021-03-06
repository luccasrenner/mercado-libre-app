import React from 'react';
import './single-item-list.component.scss';
import { Link } from "react-router-dom";
//SingleItemList Class
class SingleItemList extends React.Component{
    constructor(props){ super(props); }
    render(){
        var thumbnail = this.props.picture;
        var url = "/items/"+this.props.id;
       
        if (this.props.free_shipping) {
            var FreeShipping = ( <div className="shippingItem"></div>  );
        }
        return(
            <div className="item_element row" >
                <Link to={`/items/${this.props.id}`}>
                    <img className="img-fluid item_element_thumbnail" src={thumbnail} alt={this.props.title}/>  
                </Link>  
                <div className="col-12 col-md-4">
                    <Link to={`/items/${this.props.id}`}>
                        <h3 className="item_element_price">${this.props.price.decimals}</h3>
                        {FreeShipping}
                    </Link>
                    <p className="description"> {this.props.title} </p>
                </div>
                <div className="col-12 offset-md-2 col-md-2">
                    <small className="address">{this.props.direction}</small>
                </div>
            </div>
            
        );
    }
}
export default SingleItemList;