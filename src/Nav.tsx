import { Welcome } from './components/UserAuth/Welcome';
import App from './App';
import { useSelector, useDispatch } from 'react-redux';
import { PublicRoute } from './components/auth/PublicRoute';
import { PrivateRoute } from './components/auth/PrivateRoute';
// import './App.css';
import React, { FC, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
import { UserComponent } from './components/UserComponent';
import { Signup } from './components/UserAuth/Signup';
import { User } from './components/User/User';
import { Login } from './components/UserAuth/Login';
import { AllChirpsView } from './components/views/AllChirpsView'
import { SettingsView } from './components/views/SettingsView';
import Auth from '@aws-amplify/auth'
import './css/bootstrap.min.css';
import './css/login.css';
import './css/style.css';


function Nav() {

  const [userState, setUserState] = useState("");

  React.useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => setUserState(user.username))
      .catch(err => console.log(err));
  }, []);

  if (userState === ""){
  return(
  <Container fluid className="flex main-container text-light">
      <Row>
        <Col xs="4"></Col>
        <Col xs="8" className="main-component-col">
          <div className="main-component-box">
          <Router>
          <Switch>
            <Route exact path="/register" component={Signup} />
            <Route exact path={["/", "/login"]} component={Login} />
          </Switch>
        </Router>
          </div>
        </Col>
      </Row>
    </Container>
  )
  } else {
    return (
      <Container fluid className="flex main-container text-light">
      <Row>
        <Col xs="4" className="user-col">
          <UserComponent />
        </Col>
        {/*  */}
        <Col xs="8" className="main-component-col">
          <div className="main-component-box">
          <Router>
          <Switch>
            <Route exact path={["/", "/home"]} component={AllChirpsView} />
            <Route exact path="/settings" component={SettingsView} />
            <Route path="/user" component={User} />
          </Switch>
        </Router>
          </div>
        </Col>
      </Row>
      </Container>
    );
  }

  return null;

}

export default Nav;
