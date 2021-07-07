import React, { FC, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from './UserPool';
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../../store/store';
import { setError, signIn } from '../../actions/AuthActions';

export const Login: FC = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  // const [errors, setErrors] = React.useState({
  //   blanks: false,
  //   passwordMismatch: false,
  //   cognito: null
  // });

  let history = useHistory();
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootStore) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
    };
  }, [error, dispatch]);

  const onSubmtForm = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(signIn({ username, password }, () => setLoading(false)));
    // const userObject = await Auth.signIn(username, password);

    history.push('/user');
  };
  return (
    <div>
      <form onSubmit={onSubmtForm}>
        <input
          name="username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
        ></input>
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        ></input>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};
