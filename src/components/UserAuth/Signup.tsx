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
import axios from '../../axiosConfig';

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
  const [isPassValid, setIsPassValid] = usePasswordValidator({
    min: 8,
    max: 30,
    digits: true,
    lowercase: true,
    uppercase: true,
    symbols: true,
    spaces: false
  });
  const [isUserValid, setIsUserValid] = usePasswordValidator({
    min: 3,
    max: 30,
    lowercase: true,
    uppercase: false,
    symbols: false,
    spaces: false
  });
  const [isUserUnique, setIsUserUnique] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const checkUnique = async (attemptedName:string) => {
    const res = await axios.get('/user/' + attemptedName);
    res.data ? setIsUserUnique(false) : setIsUserUnique(true);
  }

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
          onChange={(e) => {
            setUsername(e.currentTarget.value)
            setIsUserValid(e.currentTarget.value)
            checkUnique(e.currentTarget.value)
          }}
        ></input>
        <input
          className="form-validation login-input"
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.currentTarget.value)
            setIsPassValid(e.currentTarget.value)
          }}
        ></input>
        <Row className="pl-0 m0">
          <Col className="pt-3 pl-1 ml-0">
          <span><a href="/" className="auth-switch-text">Already a user? Log in.</a></span>
          </Col>
          <Col>
            <button className="btn auth-btn" type="submit" disabled={!isPassValid || !isUserValid || !isUserUnique}>Sign up</button>
          </Col>
        </Row>
      </form>
      <div id="passReq">
        {!isUserValid &&
          <h6 className="notMet">Username Requirements</h6>
        }
        {isUserValid && 
          <h6 className="met">Username Requirements Have Been Met</h6>
        }
        <ul>
          <li className={isUserUnique ? 'met' : 'notMet'}>Must be unique</li>
          <li>Must be between 3 and 30 characters</li>
          <li>Must have at least one lowercase letter</li>
          <li>May have numbers</li>
          <li>Must not have uppercase letters, symbols, or spaces</li>
        </ul>
        {!isPassValid &&
          <h6 className="notMet">Password Requirements</h6>
        }
        {isPassValid && 
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
