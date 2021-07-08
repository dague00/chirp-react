import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUser, GetUserBio, PostUserBio } from '../../actions/UserActions';
import { RootStore } from '../../store/store';
import { Link } from 'react-router-dom';
import Auth from '@aws-amplify/auth';
import { logout } from '../../actions/AuthActions';
import chirperLogo from '../../assets/chirperLogo.png';

export const SettingsView: React.FC = () => {
  //============================================================================
  // State
  //============================================================================
  const [username, setUsername] = useState('');
  const [updateBioInputState, setUpdateBioInputState] = useState({
    value: ''
  });
  const [deleteConfirm, setDeleteConfirmState] = useState('');

  //============================================================================
  // Determine User from Incognito, from that determine bio
  //============================================================================
  const dispatch = useDispatch();

  const determineCurrentUser = () => {
    Auth.currentAuthenticatedUser({
      /* Optional, By default is false. If set to true, this call will send a 
      request to Cognito to get the latest user data*/
      bypassCache: false
    })
      .then((user) => {
        setUsername(user.username);
        // console.log(user.username);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(userState.user?.bio);
  };

  const deleteCurrentUser = () => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        dispatch(logout());
        user.deleteUser((err: any, result: any) => {
          if (err) {
            console.log('User deletion error: ' + err);
            return;
          }
          console.log('User deletion result: ' + result);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  //eslint-disable-next-line
  useEffect(determineCurrentUser, []);

  //============================================================================
  // Event Handlers
  //============================================================================
  const changeListener = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateBioInputState({ value: event.currentTarget.value });
  };

  const postUserBioListener = async () => {
    await dispatch(
      PostUserBio({
        username: username,
        bio: updateBioInputState.value
      })
    );
    setUpdateBioInputState({ value: '' });
    window.location.reload();
  };

  const deleteUserInputListener = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeleteConfirmState(event.currentTarget.value);
  };

  const deleteUserListener = async () => {
    if (deleteConfirm.toLowerCase() === 'delete') {
      await dispatch(DeleteUser(username));
      await deleteCurrentUser();
      await dispatch(logout());
      window.location.href = '/';
      // add delete function for cognito
    } else {
      console.log('Delete has not been typed.');
    }
  };

  //============================================================================
  // Render
  //============================================================================
  return (
  <>
    <div id="main-component-title">
      <span>Settings</span>
      <a href="/"><img src={chirperLogo} id="user-chirper-logo"></img></a>
    </div>
      <div id="settings-content-wrapper">
        <div id="update-bio">
          <h5 id="update-bio-label">Update your bio</h5>
          <textarea
            value={updateBioInputState.value}
            onChange={changeListener}
            className="new-bio-input form-validation"
          ></textarea>
          <br></br>
          <button onClick={postUserBioListener} className="new-bio-button btn">
            Update
          </button>
        </div>
        <div id="delete-account">
          <h5 id="update-bio-label">Delete your account</h5>
          <p>
            Are you sure you want to delete your account? Deleting your account
            is permanent and cannot be undone.
          </p>
          <p>
            Type in <strong>delete</strong> in the textbox below to confirm
            deletion.
          </p>
          <input
            value={deleteConfirm}
            onChange={deleteUserInputListener}
            className="delete-account-confirmation form-validation"
          ></input>
          <br></br>
          <button
            onClick={deleteUserListener}
            disabled={!(deleteConfirm === 'delete')}
            className="delete-account-button btn"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
