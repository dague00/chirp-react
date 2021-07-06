import React, { FC, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import UserPool from './UserPool';
import { Auth } from 'aws-amplify';
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
  const [errors, setErrors] = React.useState({
    blanks: false,
    passwordMismatch: false,
    cognito: null
  });
  let history = useHistory();

  const onSubmt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // UserPool.signUp(username, password, [], [], (err, result) => {
    //   if (err) {
    //     console.log(err);
    //   }
    //   let cognitoUser = result?.user;
    //   return cognitoUser;
    //   // console.log(result);
    // });
    try {
      const userSignupResponse = await Auth.signUp({
        username,
        password
      });
      console.log(userSignupResponse);
    } catch (error) {
      console.log(error);
    }
    history.push('/welcome');
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
