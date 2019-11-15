import React from 'react';
import { Link} from "react-router-dom";
import './search-box.component.scss';
//Import Helmet for head tag maintenance
import {Helmet} from "react-helmet";
//SearchBox component
class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        //Select input state
        this.state = { textoInput: this.props.inputValue }
        //Bind functions
        this.submitSearch = this.submitSearch.bind(this);
        this.sendTextValue = this.sendTextValue.bind(this);
        this.handleValue = this.handleValue.bind(this);
    }
    //Update text value
    handleValue(e){
        this.setState({
            textoInput: e.target.value
        })
    }
    //Submit the search if Enter keydown
    submitSearch(e){
        if(e.key === "Enter"){
            if(window.location.pathname === "/"){
                window.location.href = `/items?search=${this.state.textoInput}`;
            }else{
                window.history.pushState('','',`/items?search=${this.state.textoInput}`);
            }
            this.props.searchHandle(this.state.textoInput);
        }
    }
    //Send search to the list view
    sendTextValue(){
        this.props.searchHandle(this.state.textoInput);
    }
    //When the component is assembled it will take the query and put as input value
    componentDidMount(){
        var query = new URLSearchParams(window.location.search).get('search');
        if(this.state.textoInput === "" && query != null){
            this.setState({
                textoInput: query
            })
        }
    }
    render(){
        var urlValue = "/items?search="+this.state.textoInput
        return(
            <header>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Mercado Libre</title>
                </Helmet>
                <div className="container-fluid nav_bounds">
                    <div className="row">
                        <div className="col-2 offset-md-1 col-md-1">
                            <Link to={'/'}>
                                <img className="img-fluid nav_bounds_logo" src="http://localhost:3000/assets/_img/logo/Logo_ML.png" alt="Mercado Libre Logo"/>
                            </Link>
                        </div>
                        <div className="col-9 col-md-9">
                            <div className="input-group">
                                <input onKeyDown={this.submitSearch} onChange={this.handleValue} value={this.state.textoInput} type="text" className="form-control" placeholder="Nunca dejes de buscar" />
                                <div className="input-group-prepend">
                                    <Link to={urlValue} onClick={this.sendTextValue} >
                                        <span className="input-group-text nav_bounds_action_button_box">
                                            <i className="nav_bounds_action_button"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
export default SearchBox;