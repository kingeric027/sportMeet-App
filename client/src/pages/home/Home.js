import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth0Client from '../../Auth/authentication';
import "./style.css";


class Home extends Component {
    componentDidMount(){
        if(!auth0Client.isAuthenticated()){
            auth0Client.signIn();
        }
    }
    render() {
        return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <img src="../img/sportMeet_logo.png" alt="sportMeet logo" id="logo_home"></img>
                    <p className="lead">The App for connecting people who play sports.</p>
                </div>
            </div>

            <div className = "container">
            <Link to = "/start">
            <button type="button" className="btn btn-lg btn-block start-btns">Start a game</button>
            </Link>
           
            <Link to = "/find">
            <button type="button" className="btn btn-lg btn-block start-btns">Find a game</button>
            </Link>
            </div>
        </div>
        )
    }
}

export default Home;