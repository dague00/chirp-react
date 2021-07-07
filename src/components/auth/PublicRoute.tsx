import React, { FC } from 'react';
import { Route, Redirect, RouteProps } from 'react-router';
import { useSelector } from 'react-redux';
import { RootStore } from '../store/store';

interface Props extends RouteProps {
  component: any;
}

export const PublicRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state: RootStore) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? <Component {...props} /> : <Redirect to="/user" />
      }
    />
  );
};
