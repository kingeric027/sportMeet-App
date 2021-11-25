import { useAuth0 } from "@auth0/auth0-react";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./style.css";


class Home extends Component {
    // auth0 = useAuth0()
    // componentDidMount(){
    //     if(!auth0.isAuthenticated){
    //         auth0.loginWithRedirect()
    //     }
    // }
    render() {
        return (
        <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <img src="../img/sportMeet_logo.png" alt="sportMeet logo" id="logo_home"></img>
                    <h5 className="lead">Connecting people who play sports.</h5>
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