
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from "../../Auth/authentication";
import "./style.css";

const HomeLink = withRouter(({ history }) => (
  <Link className="navbar-brand"
    //type='button'
    onClick={() => { history.push('/') }}
    to="/"
  >
    <img src="../img/sportMeet_logo.png" alt="sportMeet logo" id="logo_navbar"></img>
  </Link>
))

const StartLink = withRouter(({ history }) => (
  <Link className="navbar-brand"
    //type='button'
    onClick={() => { history.push('/start') }}
    to="/start"
  >
    Start Game
  </Link>
))

const FindLink = withRouter(({ history }) => (
  <Link className="navbar-brand"
    //type='button'
    onClick={() => { history.push('/find') }}
    to="/find"
  >
    Find Game
  </Link>
))

function NavBar(props) {
  const signOut = () => {
    auth0Client.signOut();
    props.history.replace('/');
  };
  return (
    <nav class="navbar navbar-dark">
      <HomeLink></HomeLink>
      <StartLink></StartLink>
      <FindLink></FindLink>
      {
        !auth0Client.isAuthenticated() &&
        <button className="btn btn-dark log-btn" onClick={auth0Client.signIn}>Sign In</button>
      }
      {
        auth0Client.isAuthenticated() &&
        <div>
          <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
          <button className="btn btn-dark log-btn" onClick={() => { signOut() }}>Sign Out</button>
        </div>
      }
    </nav>
  );

}

export default withRouter(NavBar);