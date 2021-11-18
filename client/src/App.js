import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Home from "./pages/home/Home";
import Start from "./pages/start/index";
import Find from "./pages/find/index";
import Callback from './pages/callback/index';
import ThisGame from './pages/ThisGame/index';
import './App.css';
import auth0Client from './Auth/authentication';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }
  render() {
    return (

      <div>
        <Route exact path='/' component={Home} />
        <Route exact path='/start' component={Start} />
        <Route exact path='/find' component={Find} />
        <Route exact path='/callback' component={Callback} />
        <Route exact path="/games/:id" component={ThisGame} />
      </div>
    );
  }
}

export default withRouter(App);

