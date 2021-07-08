import React, {useState, useEffect} from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetUserBio, PostUserBio } from '../../actions/UserActions';
import { RootStore } from '../../store/store';
import Auth from '@aws-amplify/auth';


export const SettingsView: React.FC = () => {
  //============================================================================
  // State
  //============================================================================
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [updateBioInputState, setUpdateBioInputState] = useState({
    value: ""
  });
  const user = useSelector((state: RootStore) => state.user);



  //============================================================================
  // Determine User from Incognito, from that determine bio
  //============================================================================
  const dispatch = useDispatch();

  const getUserBioDispatcher = () => {
    dispatch(GetUserBio(username));
  }

  const determineCurrentUser = () => {
    Auth.currentAuthenticatedUser({
      /* Optional, By default is false. If set to true, this call will send a 
      request to Cognito to get the latest user data*/
      bypassCache: false  
    }).then(user => {
      setUsername(user.username);
      console.log(user.username);
      getUserBioDispatcher();
      setBio(user.bio);
      console.log(user.bio);
    })
    .catch(err => {
      console.log(err);
    });
  }
  //eslint-disable-next-line
  useEffect(determineCurrentUser,[]);



  //============================================================================
  // Event Handlers
  //============================================================================
  const changeListener = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUpdateBioInputState({value: event.currentTarget.value});
  }

  const postUserBioListener = async () => {
    await dispatch(PostUserBio({
     "username": username,
     "bio": updateBioInputState.value
   }));
   setUpdateBioInputState({value: ""});
   getUserBioDispatcher();
   console.log(bio);
 }


  //============================================================================
  // Render
  //============================================================================
  return (
  <>
  <div className="dropdown">
    <button 
      className="btn btn-secondary dropdown-toggle"
      type="button"
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false">
      . . . 
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <a className="dropdown-item" href="#">Delete Profile</a>
    </div>
  </div>
    <div id="current-profile">
      {/*Maybe the default image could go here too?*/}
      <p>Current profile: {username}</p> {/*Could be a header, maybe?*/}
      <p>Current bio: {bio}</p>
    </div>
    <div id="update-bio">
      <h5 id="update-bio-label">Change bio</h5>
        <textarea 
          value={updateBioInputState.value} 
          onChange={changeListener} 
          className="new-bio-input form-validation">
        </textarea>
        <br></br>
        <button onClick={postUserBioListener} className="new-bio-button btn">Post</button>
    </div>
  </>
  )
}