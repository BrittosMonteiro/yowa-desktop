import React from "react";
import {
  BrowserRouter as Router, Switch,
} from "react-router-dom";

import Routes from "./Router/routes";

import './App.css';
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Routes />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
