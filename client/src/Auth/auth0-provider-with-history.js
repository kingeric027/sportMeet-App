import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
    const domain = 'kingeric.auth0.com'  //process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = 'rXCuA1B5sRN4jIkKSeseu3WGeET4xWoS' //process.env.REACT_APP_AUTH0_CLIENT_ID;

    const history = useHistory();

    const onRedirectCallback = (appState) => {
        console.log("redirect call back")
        const route = appState && appState.returnTo ? appState.returnTo : window.location.pathname
        history.push(aroute);
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;