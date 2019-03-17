import React, { Component } from "react";
import Geocode from "react-geocode";
import { Link, withRouter } from "react-router-dom";
import Navbar from "../../components/navbar/index";
import Map from "../../components/Map2";
import API from "../../utils/API";
import auth0Client from '../../Auth/authentication';
import moment from 'moment';
import "./style.css"



class Start extends Component {
    state = {
        formToggle:0,  //The formToggle allows users to switch between input form and map with next/back button
        sport:"Basketball",
        skill:"1",
        players:"1",
        playersArray:[],
        date:"",
        time:"",
        user: "Anonymous", 
        address:"",
        location:{
            lat: "",
            lng: ""
        },
        comments:[]
    }

    toggle = event =>{
        if(event.target.id === "next"){  //Go to map
            this.setState({
                formToggle:1
            })
        } else if(event.target.id === "back"){  //Go back to form
            this.setState({
                formToggle:0
            })
        }
    }

 
    
    //function for submitting the data (still needs to be done)
    onSubmit = () => {
        console.log("submit");
        
        const data = {
            sport: this.state.sport,
            skill: this.state.skill,
            players: this.state.players,
            playersArray: this.state.playersArray,
            time: moment(this.state.time, "HH:MM A").format("h:MM A"),
            date: this.state.date,
            location: this.state.location,
            address: this.state.address,  
            user: this.state.user,
            comments: this.state.comments
            
        }
        console.log(data);
        API.saveGame(data);
        
    };

    //Function for updating the state as the dropdowns are updated
    handleInputChange = event => {
        console.log(event);
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    onMapChange = (newlat, newlng, addr) => {
        this.setState({
            location: {
                lat: newlat,
                lng: newlng
            },
            address: addr
        })
    }

    componentDidMount(){
        if(auth0Client.getProfile()){
            this.setState({
                user: auth0Client.getProfile().name
            })
        } else {
            auth0Client.signIn();
        }
    }; 

    render(){
        const Button = withRouter(({ history }) => (
            <button
              type='button'
              className = "btn btn-primary btn-lg btn-block"
             onClick={() => {this.onSubmit(); history.push('/find') }} 
            >
              Submit
            </button>
          ))
        return (
        <div>
            <Navbar></Navbar>
            <div className = "container">
                <h3 className = "startHeader">Start a Game</h3>
            <br></br>
            {this.state.formToggle===0 ?(
                <form className = "startForm">
                <label htmlFor="sport">Sport: </label>
                <select name = "sport" id = "selectSport" onChange = {this.handleInputChange}>
                    <option value="Basketball">Basketball</option>
                    <option value="Football">Football</option>
                    <option value="Soccer">Soccer</option>
                    <option value="Hockey">Hockey</option>
                    <option value="Tennis">Tennis</option>
                    <option value="Ultimate Frisbee">Ultimate Frisbee</option>
                </select>
            <br></br>
            <label htmlFor="skill">What is your groups overall skill level?</label>
                <select name = "skill" id = "selectSkill" onChange = {this.handleInputChange}>
                    <option value="1">1 Beginner</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5 Expert</option>
                </select>
            <br></br>
            <label htmlFor="players">What is the max number of players you can add to your game?</label>
                <select name = "players" id = "players" onChange = {this.handleInputChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                </select>
            <br></br>
            <div>
                Time: <input name="time" type="time" id="time" onChange = {this.handleInputChange}></input>
            </div>
            <br></br>
            <div>
                Date: <input name="date" type = "date" id="date" onChange = {this.handleInputChange}></input>
            </div>
            <br></br>
            <div>
                <button id = "next" onClick = {this.toggle}>Next</button>
            </div>
            </form>
            ) : (
                <div>
                <button id = "back" onClick={this.toggle}>Back</button> 
                <h5>Where are you playing?</h5>
                <div id = "mapDiv">
                <Map
                    google = {this.props.google}
                    center = {{lat: 44.9740, lng: -93.227}}
                    height = '300px'
                    zoom = {12}
                    dragMarker = {true}
                    onMapChange ={this.onMapChange}
               /> 
                </div>
                
               
               <Button></Button> 
               {/* <button type="button" class="btn btn-primary btn-lg btn-block" onClick = { this.onSubmit}>Submit</button> */}
                </div>
            )}
        
                
            </div> 
            
        </div>
        )
    }
}

export default Start;
