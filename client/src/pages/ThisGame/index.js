import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "../../components/Grid";
import API from "../../utils/API";
import Navbar from "../../components/navbar/index";
import moment from 'moment';
import "./style.css";
import { useAuth0 } from "@auth0/auth0-react";
class ThisGame extends Component {
    state = {
        game: {},
        currentComment: "",
        commentsArray: [],
        playersArray: []
    };

    componentDidMount() {
        const {isAuthenticated, loginWithRedirect} = useAuth0()
        if (!isAuthenticated) {
            loginWithRedirect()
        }
        this.loadGame();
    }

    loadGame = () => {
        console.log("Game ID: " + this.props.match.params.id)
        API.getGame(this.props.match.params.id)
            .then(res => this.setState({
                game: res.data,
                commentsArray: res.data.comments,
                playersArray: res.data.playersArray
            }))
            .catch(err => console.log(err));
    }

    updateGame = index => {
        const gameToChange = this.state.games[index];
        console.log(gameToChange);
        gameToChange.players = gameToChange.players - 1;
        console.log("new players: " + gameToChange.players);
        API.updateGame(gameToChange._id, gameToChange)
            .then(res => this.loadGame())
            .catch(err => console.log(err));
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };


    handleComment = (e) => {
        e.preventDefault();
        const {user} = useAuth0()
        const gameToChange = this.state.game;
        gameToChange.comments.push({
            user: user,
            text: this.state.currentComment
        });
        API.updateGame(gameToChange._id, gameToChange)
            .then(res => this.loadGame())
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Navbar></Navbar>
                <Container>
                    <Row>
                        <Col size="md-6">
                            <h3>{this.state.game.user}'s {this.state.game.sport} game</h3>
                            <h5>{moment(this.state.game.date).format("MMM Do YYYY")}, {this.state.game.time}</h5>
                            <h5>{this.state.game.address}</h5>
                            <p>Skill Level: {this.state.game.skill}</p>
                            <p>Players:</p>
                            <ul>
                                {this.state.playersArray.map(p => {
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
                                    {this.state.commentsArray.map(c => {
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
                                value={this.state.currentComment}
                                onChange={this.handleInputChange}
                                placeholder="Chat!">
                            </textarea>
                            <button type="button" class="btn btn-block commentBtn" onClick={this.handleComment}>Submit</button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default ThisGame;