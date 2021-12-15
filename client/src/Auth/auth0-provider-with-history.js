import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWithHistory = ({ children }) => {
    console.log("environment vars")
    console.log(process.env)
    const domain = process.env.REACT_APP_AUTH0_DOMAIN || "kingeric.auth0.com";
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID || "rXCuA1B5sRN4jIkKSeseu3WGeET4xWoS";

    const history = useHistory();

    const onRedirectCallback = (appState) => {
        const route = appState && appState.returnTo ? appState.returnTo : window.location.pathname
        history.push(route);
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