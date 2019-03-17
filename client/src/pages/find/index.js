
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Row, Col, Container} from "../../components/Grid";
import API from "../../utils/API";
import Navbar from "../../components/navbar/index";
import Map from "../../components/findMap";
import auth0Client from "../../Auth/authentication";

import {GameList, GameListItem} from '../../components/gameItem';

class Find extends Component {
    state = {
        games:[]
    };

    componentDidMount(){
        if(!auth0Client.isAuthenticated()){
            auth0Client.signIn();
        }
        this.loadGames();
        console.log(this.state.games);
    }

    loadGames = () => {
        console.log("GET REQUEST")
        API.getFutureGames()
        .then(res => this.setState( {games:res.data} ))
        .catch(err => console.log(err));
    }

    deleteGame = id => {
        console.log("DELETE REQUEST")
        API.deleteGame(id)
        .then(res => this.loadGames())
        .catch(err => console.log(err));
    }


    updateGame = index => {
        const user = auth0Client.getProfile().name;
        if(!auth0Client.isAuthenticated()){  //If not logged in make user log in before joining game.
            auth0Client.signIn();
        }
        const gameToChange = this.state.games[index];
        console.log("User: "+user);
        console.log("player Array initial: "+ gameToChange.playersArray);
        console.log("User in game: "+ gameToChange.playersArray.includes(auth0Client.getProfile().name));
        if(gameToChange.playersArray.includes(user)){

            gameToChange.players = gameToChange.players + 1;
            gameToChange.playersArray.splice(gameToChange.playersArray.indexOf(user),1);
            console.log("players Array after: "+ gameToChange.playersArray);
        } else {
            gameToChange.players = gameToChange.players - 1;
            gameToChange.playersArray.push(user);
            console.log("player Array after: "+gameToChange.playersArray);
        }
        API.updateGame(gameToChange._id, gameToChange)
            .then(res => this.loadGames())
            .catch(err => console.log(err));
    }

    render(){
        return (
        <div>
            <Navbar></Navbar>
            <Container>
                <h3>Upcoming Games</h3>
                <Row>
                    <Col size="md-4">
                        <GameList>
                        {this.state.games.map((game, index) =>{
                        console.log(game.playersArray);
                        return (
                            <GameListItem
                            key = {game._id}
                            id = {game._id}
                            user = {game.user}
                            sport = {game.sport}
                            players = {game.players}
                            playersArray = {game.playersArray}
                            time = {game.time}
                            date = {game.date}
                            address = {game.address}
                            coords = {game.location}
                            DeleteFunction = {() => this.deleteGame(game._id)}
                            UpdateFunction = {() => this.updateGame(index)} //Need to decrease players by one
                            >
                            </GameListItem>

                        )
                        })}
                        </GameList>
                        </Col>

                        <Col size="md-8">
                            <div>
                            <Map
                                gamesArray = {this.state.games }
                                google = {this.props.google}
                                center = {{lat: 44.9740, lng: -93.227}}
                                height = '300px'
                                zoom = {10}
                            >
                            </Map>
                            </div>
                        </Col>
                    </Row>
                
            </Container>
        </div>
        )
    }
}

export default Find;