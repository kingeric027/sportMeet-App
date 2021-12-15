import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Container } from "../../components/Grid";
import API from "../../utils/API";
import Navbar from "../../components/navbar/index";
import moment from 'moment';
import "./style.css";
import { useAuth0 } from "@auth0/auth0-react";


const ThisGame = (props) => {
    const {isAuthenticated, loginWithRedirect, user} = useAuth0()
    const[gameState, setGameState] = useState({
        game: {},
        currentComment: "",
        commentsArray: [],
        playersArray: []
    })

    const loadGame = useCallback(() => {
        API.getGame(props.match.params.id)
            .then(res => setGameState({
                game: res.data,
                commentsArray: res.data.comments,
                playersArray: res.data.playersArray
            }))
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if(!isAuthenticated) {
            loginWithRedirect()
        }
        loadGame()
    }, [isAuthenticated, loginWithRedirect, loadGame])

    const updateGame = (index) => {
        const gameToChange = gameState.games[index] //this.state.games[index];
        gameToChange.players = gameToChange.players - 1;
        API.updateGame(gameToChange._id, gameToChange)
            .then(res => loadGame())
            .catch(err => console.log(err));
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setGameState({
            ...gameState,
            [name]: value
        });
    };


    const handleComment = (e) => {
        e.preventDefault();
        const gameToChange = gameState.game;
        gameToChange.comments.push({
            user: user,
            text: gameState.currentComment
        });
        API.updateGame(gameToChange._id, gameToChange)
            .then(res => loadGame())
            .catch(err => console.log(err));
    }

    return (
<div>
                <Navbar></Navbar>
                <Container>
                    <Row>
                        <Col size="md-6">
                            <h3>{gameState.game.user}'s {gameState.game.sport} game</h3>
                            <h5>{moment(gameState.game.date).format("MMM Do YYYY")}, {gameState.game.time}</h5>
                            <h5>{gameState.game.address}</h5>
                            <p>Skill Level: {gameState.game.skill}</p>
                            <p>Players:</p>
                            <ul>
                                {gameState.playersArray.map(p => {
                                    return (
                                        <li>{p}</li>
                                    )
                                })}
                            </ul>
                        </Col>
                        <Col size="md-6">
                            <div class="card divCard">
                                <h5 class="card-header">Chat Box</h5>
                                <div class="card-body">
                                    {gameState.commentsArray.map(c => {
                                        return (
                                            <div className="commentDiv">
                                                <p className="commentP">
                                                    {c.user}:
                                                </p>
                                                <p className="commentP">
                                                    {c.text}
                                                </p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <textarea
                                name="currentComment"
                                value={gameState.currentComment}
                                onChange={handleInputChange}
                                placeholder="Chat!">
                            </textarea>
                            <button type="button" class="btn btn-block commentBtn" onClick={handleComment}>Submit</button>
                        </Col>
                    </Row>
                </Container>
            </div>
    )
}


export default ThisGame;