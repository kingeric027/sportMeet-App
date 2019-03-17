import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Row, Col, Container} from "../../components/Grid";
import API from "../../utils/API";
import Navbar from "../../components/navbar/index";
import {CommentList, CommentListItem} from '../../components/comments/index';
import auth0Client from "../../Auth/authentication";
import moment from 'moment';
import "./style.css";
class ThisGame extends Component {
    state = {
        game:{},
        currentComment:"",
        commentsArray:[],
        playersArray:[]
    };

    componentDidMount(){
        if(!auth0Client.isAuthenticated()){
            auth0Client.signIn();
        }
        this.loadGame();
    }

    loadGame = () => {
        console.log("Game ID: "+this.props.match.params.id)
        API.getGame(this.props.match.params.id)
        .then(res => this.setState( {
            game:res.data,
            commentsArray: res.data.comments,
            playersArray: res.data.playersArray} ))
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
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
      };
    

    handleComment = (e) => {
        e.preventDefault(); 
        const user = auth0Client.getProfile().name;
        //const commentObject = { user, text };
        const gameToChange = this.state.game;
 
        gameToChange.comments.push({
            user: user,
            text: this.state.currentComment
        });  //Push new comment object into comments array
        API.updateGame(gameToChange._id, gameToChange)
            .then(res => this.loadGame())
            .catch(err => console.log(err));
 
        //e.target.elements.comment.value = '';
        console.log(this.state.game)
    }

    render(){
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
                            <ul>Players:
                                {this.state.playersArray.map(p =>{
                                    return (
                                        <li>{p}</li>
                                    )
                                })}
                            </ul>

                            
                    </Col>
    
                    <Col size = "md-6">
                    
                        <div class="card divCard">
                        <h5 class="card-header">Chat Box</h5>
                        <div class="card-body">
                            {this.state.commentsArray.map(c =>{
                            return (
                            <div className="commentDiv">
                                <p className = "commentP">
                                    {c.user}: 
                                </p>
                                <p className = "commentP">
                                    {c.text}
                                </p>
                                
                            </div>
                            )
                            })}
                        </div>
                        </div>
            
                            <textarea 
                                name = "currentComment"
                                value = {this.state.currentComment}
                                onChange = {this.handleInputChange}
                                placeholder = "Chat!">
                                </textarea>

                            <button type="button" class="btn btn-primary btn-block commentBtn" onClick = {this.handleComment}>Submit</button>
                    </Col>
                </Row>
                    
                </Container>
            </div>
            )
        }
    }

export default ThisGame;