import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { Auth0Provider } from "@auth0/auth0-react";
//dev-zya32e51.us.auth0.com
//IciGPaj9Dv3bFp3e6m4C3x0Xe2B3XI8l
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-zya32e51.us.auth0.com"
      clientId="IciGPaj9Dv3bFp3e6m4C3x0Xe2B3XI8l"
      redirectUri={window.location.origin}
    >
      <GithubProvider>
        <App />
      </GithubProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
