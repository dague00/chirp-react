import React, { FC, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Signup } from './components/UserAuth/Signup';
import { Welcome } from './components/UserAuth/Welcome';
import { User } from './components/User/User';
import { Login } from './components/UserAuth/Login';
import App from './App';
import { SettingsView } from './components/views/SettingsView';
import { useSelector, useDispatch } from 'react-redux';
import { PublicRoute } from './components/auth/PublicRoute';
import { PrivateRoute } from './components/auth/PrivateRoute';

function Nav() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/register" component={Signup} />
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Welcome} />
          <Route exact path="/settings" component={SettingsView} />
          <Route path="/user" component={User} />
        </Switch>
      </Router>
    </div>
  );
}

export default Nav;
