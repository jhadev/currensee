import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Main from "./containers/Main";
import HomePage from "./containers/HomePage";
import "./App.css";

//import Dashboard from "./containers/Dashboard";

const App = () => (
  <Router>
    <div className="background">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dash" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route component={HomePage} />
      </Switch>
    </div>
  </Router>
);

export default App;
