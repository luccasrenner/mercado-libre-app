import React from 'react';
import './category-navbar.component.scss';

class CategoryNavbar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <nav className="nav">
                {
                    this.props.category.map( e => {
                        return(
                        <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">{e}</a>
                        )
                    })
                }
            </nav>
        );
    }
}
export default CategoryNavbar;