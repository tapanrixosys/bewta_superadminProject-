import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import { ApolloProvider } from '@apollo/client';
// import client from './ApolloClient/ApolloClient';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <ApolloProvider client={client}> */}
      <App />
    {/* </ApolloProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
