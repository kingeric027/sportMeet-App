
import React from "react";
import { Container, Row, Col } from "../Grid";
import moment from 'moment';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from "../../Auth/authentication";
import './style.css';

// BookList renders a bootstrap list item
export function GameList({ children }) {
    return <ul className="list-group game-list">{children}</ul>;
  }
  

  // RecipeListItem renders a bootstrap list item containing data from the recipe api call
  export function GameListItem(
    props
  ) {
    const currentUser = auth0Client.getProfile().name;

    const Button = () => {
      if(props.playersArray.includes(currentUser)){
        return(<button type="button" className="btn btn-leave" id={props.id} onClick={props.UpdateFunction}>Leave Game</button>)
      } else if(props.players <= 0){
        return(<button type="button" className="btn btn-full" id={props.id}>Game Full</button>)
      } else {
        return(<button type="button" className="btn btn-join" id={props.id} onClick={props.UpdateFunction}>Join Game</button>)
      }
    } 

    const GameLink = withRouter(({ history }) => (
      <Link 
        className = "game-link"
        onClick={() => { history.push("/find") }}
        to ={"/games/" + props.id}
      >
      
      <h5 className = "card-header card-background gameListHeader">{props.user} is Playing {props.sport}</h5>
      </Link>
    ))
    return (
      <li className="list-group-item">
          <Row>      
              <div class="card">
              <GameLink></GameLink>
              <div class="card-body">
              <h5 class="card-title">Spots Available: {props.players}</h5>
              <p>{moment(props.date).format("MMM Do YYYY")}, {moment(props.time, "HH:MM A").format("h:MM A")}</p>
              <p>{props.address}</p>
              <Button></Button>
        
          {/*    {props.playersArray.includes(currentUser) ?( //user is in game
                <button type="button" className="btn btn-leave" id={props.id} onClick={props.UpdateFunction}>Leave Game</button>
              ):(
                <button type="button" className="btn btn-join" id={props.id} onClick={props.UpdateFunction}>Join Game</button>
              )} */}
            {/*  <button onClick = {props.DeleteFunction}>Delete</button>  */}
              </div>
            </div>
            
          </Row>
       
      </li>
    );
  }