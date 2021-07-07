import React, { FC, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Signup } from './components/UserLogin/Signup';
import { Welcome } from './components/UserLogin/Welcome';
import { User } from './components/User/User';
import { Login } from './components/UserLogin/Login';
import { useSelector, useDispatch } from 'react-redux';
import { PublicRoute } from './components/auth/PublicRoute';
import { PrivateRoute } from './components/auth/PrivateRoute';

// interface IAuth {
//   isAuthenticated: boolean;
// }

function App() {
  //global state
  // const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  // const [user, setUser] = React.useState(null)

  // const setAuthStatus = (auth:Boolean) => {
  //   setIsAuthenticated({isAuthenticated: auth})
  // }
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/welcome" component={Welcome} />
          <Route path="/user" component={User} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
