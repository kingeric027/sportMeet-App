import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Auth0ProviderWithHistory from "./Auth/auth0-provider-with-history";

// const jwt = require('express-jwt');
// const jwksRsa = require('jwks-rsa');

// const checkJwt = jwt({
//   secret: jwksRsa.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: `https://kingeric.auth0.com/.well-known/jwks.json`
//   }),
//   // Validate the audience and the issuer.
//   audience: 'rXCuA1B5sRN4jIkKSeseu3WGeET4xWoS',
//   issuer: `https://kingeric.auth0.com/`,
//   algorithms: ['RS256']
// });


ReactDOM.render(
  <BrowserRouter>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </BrowserRouter>
  , document.getElementById('root'));

serviceWorker.unregister();