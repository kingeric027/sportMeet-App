import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/index";
import SelectLocationMap from "../../components/Maps/SelectLocationMap";
import API from "../../utils/API";
import moment from 'moment';
import "./style.css"
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router";


const Start = (props) => {
    const history = useHistory()
    const { user, loginWithRedirect } = useAuth0()
    const [startState, setStartState] = useState({})

    useEffect(() => {
        const state = {
            formToggle: 0,  //The formToggle allows users to switch between input form and map with next/back button
            sport: "Basketball",
            skill: "1",
            players: "1",
            playersArray: [],
            date: "",
            time: "",
            user: "Anonymous",
            address: "",
            location: {
                lat: "",
                lng: ""
            },
            comments: []
        }
        if (user) {
            setStartState({
                ...state,
                user: user.name
            })
        } else {
            loginWithRedirect();
        }
    }, [user])

    const toggle = (event) => {
        if (event.target.id === "next") {  //Go to map
            setStartState({
                ...startState,
                formToggle: 1
            })
        } else if (event.target.id === "back") {  //Go back to form
            setStartState({
                ...startState,
                formToggle: 0
            })
        }
    }

    //function for submitting the data
    const onSubmit = () => {
        const data = {
            sport: startState.sport,
            skill: startState.skill,
            players: startState.players,
            playersArray: startState.playersArray,
            time: moment(startState.time, "HH:MM").format("h:mm A"),
            date: startState.date,
            location: startState.location,
            address: startState.address,
            user: startState.user,
            comments: startState.comments

        }
        API.saveGame(data);
    };

    //Function for updating the state as the dropdowns are updated
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setStartState({
            ...startState,
            [name]: value
        })
    }

    const onMapChange = (newlat, newlng, addr) => {
        setStartState({
            ...startState,
            location: {
                lat: newlat,
                lng: newlng
            }
        })
    }

    const handleSubmit = () => {
        onSubmit()
        history.push('/find')
    }

    return (
        <div>
            <Navbar></Navbar>
            <div className="container">
                <h3 className="startHeader"><strong>Start a Game</strong></h3>
                <hr></hr>
                {startState.formToggle === 0 ? (
                    <form className="startForm">
                        <label htmlFor="sport">Sport: </label>
                        <select name="sport" id="selectSport" onChange={handleInputChange}>
                            <option value="Basketball">Basketball</option>
                            <option value="Football">Football</option>
                            <option value="Soccer">Soccer</option>
                            <option value="Hockey">Hockey</option>
                            <option value="Tennis">Tennis</option>
                            <option value="Ultimate Frisbee">Ultimate Frisbee</option>
                        </select>
                        <br></br>
                        <label htmlFor="skill">What is your groups overall skill level?</label>
                        <select name="skill" id="selectSkill" onChange={handleInputChange}>
                            <option value="1">1 Beginner</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5 Expert</option>
                        </select>
                        <br></br>
                        <label htmlFor="players">What is the max number of players you can add to your game?</label>
                        <select name="players" id="players" onChange={handleInputChange}>
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
                            Time: <input name="time" type="time" id="time" onChange={handleInputChange}></input>
                        </div>
                        <br></br>
                        <div>
                            Date: <input name="date" type="date" id="date" onChange={handleInputChange}></input>
                        </div>
                        <br></br>
                        <div>
                            <button id="next" onClick={toggle}>Next</button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <button id="back" onClick={toggle}>Back</button>
                        <h5>Where are you playing?</h5>
                        <div id="mapDiv">
                            <SelectLocationMap
                                google={props.google}
                                center={{ lat: 44.9740, lng: -93.227 }}
                                height='300px'
                                zoom={12}
                                dragMarker={true}
                                onMapChange={onMapChange}
                            />
                        </div>
                        {/* <SubmitButton onSubmit={this.onSubmit}></SubmitButton> */}
                        <button
                            type='button'
                            className="btn submit-btn btn-lg btn-block"
                            onClick={() => handleSubmit()}
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Start;
