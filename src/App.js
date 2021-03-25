import React from "react";
import {
  BrowserRouter as Router, Switch,
} from "react-router-dom";

import Routes from "./Router/routes";

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Routes />
      </Switch>
    </Router>
  );
}

export default App;
