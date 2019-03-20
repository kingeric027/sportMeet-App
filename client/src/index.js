import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';


import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Might have to put this somewhere else
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
  audience: 'RgypgNKbpL15E9tPKlmrOYbnEGfaX9UJ',
  issuer: `https://kingeric.auth0.com/`,
  algorithms: ['RS256']
});


ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();