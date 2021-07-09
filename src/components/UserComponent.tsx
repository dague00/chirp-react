import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootStore } from '../store/store';
import { Row, Col } from 'reactstrap';
import settings from '../assets/settings.png';
import defaultUserImage from '../assets/defaultUserImage.png';
import Auth from '@aws-amplify/auth';
import { GetUserBio } from '../actions/UserActions';
import { logout } from '../actions/AuthActions';
import { useHistory, Redirect } from 'react-router-dom';

export const UserComponent: React.FC = () => {
  const user = useSelector((state: RootStore) => state.user);
  const dispatch = useDispatch();
  const getUserBioDispatcher = (username: string) => {
    dispatch(GetUserBio(username));
  };

  const userLogout = async () => {
    await dispatch(logout());
    window.location.href = '/';
  };
  React.useEffect(() => {
    Auth.currentAuthenticatedUser({
      bypassCache: false // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    })
    .then((user) => {
      getUserBioDispatcher(user.username);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id="user-box" className="p-0">
      {/* User info bio */}
      <Row id="user-box-img">
        <Col>
          <img
            id="user-img"
            alt="pfp"
            src={defaultUserImage}
          ></img>
        </Col>
      </Row>
      <Row className="mt-2 mb-3" id="user-box-info">
        <Col>
          <h5 className="pt-2" id="user-box-username">
            <a href="#">@{user.user?.username}</a>
          </h5>
          <p>{user.user?.bio}</p>
        </Col>
      </Row>
      {/* User settings & logout button */}
      <Row id="user-box-settings">
        <Col className="settings-icon-col pt-2">
          <span>
            <img src={settings} id="settings-icon"></img>
            <a href="/settings">Settings</a>
          </span>
        </Col>
        <Col>
          <a href="#">
            <span
              className="float-right mr-3 logout-btn btn"
              onClick={userLogout}
            >
              Logout
            </span>
          </a>
        </Col>
      </Row>
    </div>
  );
};
