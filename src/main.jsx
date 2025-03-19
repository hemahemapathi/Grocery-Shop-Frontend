import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";


// Add polyfill for ReactDOM.findDOMNode
if (!ReactDOM.findDOMNode) {
  ReactDOM.findDOMNode = function(component) {
    if (!component) {
      return null;
    }
    
    // Handle DOM nodes
    if (component.nodeType === 1) {
      return component;
    }
    
    // Handle React components
    if (component._reactInternals) {
      return component._reactInternals.stateNode;
    }
    
    return null;
  };
}

// Set axios default base URL
axios.defaults.baseURL = 'http://localhost:5000';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

reportWebVitals();