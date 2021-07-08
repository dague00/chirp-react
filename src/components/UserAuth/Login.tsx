import React, { FC, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from './UserPool';
import { Auth } from 'aws-amplify';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store/store';
import { setError, signIn } from '../../actions/AuthActions';
import chirperLogo from '../../assets/chirperLogo.png';

export const Login: FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
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
    await dispatch(signIn({ username, password }, () => {setLoading(false);}));
    // const userObject = await Auth.signIn(username, password);
    window.location.reload();
  }
  return (
    <div className="authentication-box">
    <img src={chirperLogo} className="chirper-logo"></img>
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
          onChange={(e) => setPassword(e.currentTarget.value)}
        ></input>
        <Row className="pl-0 m0">
          <Col className="pt-2 pl-0 ml-0">
          <span><a href="/register" className="auth-switch-text">No account? Sign up</a></span>
          </Col>
          <Col>
            <button className="btn auth-btn" type="submit">Log in</button>
          </Col>
        </Row>
      </form>
    </div>);
};
