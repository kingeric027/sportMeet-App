import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://kingeric.auth0.com/.well-known/jwks.json`
}),
  // Validate the audience and the issuer.
  audience: 'rXCuA1B5sRN4jIkKSeseu3WGeET4xWoS',
  issuer: `https://kingeric.auth0.com/`,
  algorithms: ['RS256']
});


ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.unregister();