import React, { FC, FormEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserPool from './UserPool';
import { Auth } from 'aws-amplify';
import { useDispatch, useSelector } from 'react-redux';
import { RootStore } from '../store/store';
import { setError, signup } from '../store/actions/AuthActions';

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
    dispatch(signup({ username, password }, () => setLoading(false)));
    history.push('/welcome');
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
