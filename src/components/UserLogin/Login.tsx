import React, { FC, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from './UserPool';
import { Auth } from 'aws-amplify';

export const Login = (props: any): any => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState({
    blanks: false,
    passwordMismatch: false,
    cognito: null
  });
  let history = useHistory();

  const onSubmt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userObject = await Auth.signIn(username, password);
      console.log(userObject);
      // props.auth.setAuth(true);
      // props.auth.setUser(userObject);
    } catch (error) {
      console.log(error);
    }

    // const user = new CognitoUser({
    //   Username: username,
    //   Pool: UserPool
    // });
    // const authDetails = new AuthenticationDetails({
    //   Username: username,
    //   Password: password
    // });
    // user.authenticateUser(authDetails, {
    //   onSuccess: (data) => {
    //     console.log('Success: ', data);
    //     // console.log(user.getUsername());
    //   },
    //   onFailure: (err) => {
    //     console.error('Failure: ', err);
    //   }
    // });
    history.push('/user');
  };
  return (
    <div>
      <form onSubmit={onSubmt}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};
