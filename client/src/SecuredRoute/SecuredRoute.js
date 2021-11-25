import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import {Route} from 'react-router-dom';

function SecuredRoute(props) {
  const {isAuthenticated, loginWithRedirect} = useAuth0();
  const {component: Component, path} = props;
  return (
    <Route path={path} render={() => {
        if (!isAuthenticated) {
          loginWithRedirect();
          return <div></div>;
        }
        return <Component />
    }} />
  );
}

export default SecuredRoute;