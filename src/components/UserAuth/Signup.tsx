import React, { FC, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserPool from './UserPool';
import { Auth } from 'aws-amplify';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store/store';
import { setError, signup } from '../../actions/AuthActions';
import { CreateUser } from '../../actions/UserActions';
import chirperIcon from '../../assets/chirperIcon.png';
import usePasswordValidator from 'react-use-password-validator';

// import Amplify, { Auth } from 'aws-amplify';
// import config from './config.json'

// Amplify.configure({
//   Auth: {
//     mandatorySignId: true,
//     region: config.cognito.REGION,
//     userPoolId: config.cognito.USER_POOL_ID,
//     userPoolWebClientId: config.cognito.APP_CLIENT_ID
//   }
// });

export const Signup = (): any => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isValid, setIsValid] = usePasswordValidator({
    min: 8,
    max: 30,
    digits: true,
    lowercase: true,
    uppercase: true,
    symbols: true,
    spaces: false
  });
  const [loading, setLoading] = React.useState(false);

  // const [errors, setErrors] = React.useState({
  //   blanks: false,
  //   passwordMismatch: false,
  //   cognito: null
  // });
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootStore) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
    };
  }, [error, dispatch]);

  const onSubmtForm = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(signup({ username, password }, () => setLoading(false)));
    await dispatch(CreateUser({
      "username": username,
      "bio": "Go to settings to update your bio."
    }));
    
    if (loading === false){
      window.location.reload();
      window.location.href = "/";
    }
  };

  return (
    <div className="authentication-box">
    <h3 className="auth-title">
      <img src={chirperIcon} className="chirper-icon"></img>
      Sign up for chirper
    </h3>
      <form onSubmit={onSubmtForm} className="auth-form">
        <input
          className="form-validation login-input"
          name="username"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.currentTarget.value)}
        ></input>
        <input
          className="form-validation login-input"
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.currentTarget.value)
            setIsValid(e.currentTarget.value)
          }}
        ></input>
        <Row className="pl-0 m0">
          <Col className="pt-3 pl-1 ml-0">
          <span><a href="/" className="auth-switch-text">Already a user? Log in.</a></span>
          </Col>
          <Col>
            <button className="btn auth-btn" type="submit" disabled={!isValid}>Sign up</button>
          </Col>
        </Row>
      </form>
      <div id="passReq">
        {!isValid &&
          <h6 className="notMet">Password Requirements</h6>
        }
        {isValid && 
          <h6 className="met">Password Requirements Have Been Met</h6>
        }
        <ul>
          <li>Must be between 8 and 30 characters</li>
          <li>Must have uppercase and lowercase letters</li>
          <li>Must have at least one number</li>
          <li>Must have at least one symbol</li>
          <li>Must not contain spaces</li>
        </ul>
      </div>
    </div>
  );
};
