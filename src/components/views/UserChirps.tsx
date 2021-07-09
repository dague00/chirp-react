import React from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetUsersChirps } from '../../actions/UserChirpsActions';
import { RootStore } from '../../store/store';
import Auth from '@aws-amplify/auth';
import { GetUserBio } from '../../actions/UserActions';
import chirperLogo from '../../assets/chirperLogo.png'
import defaultUserImage from '../../assets/defaultUserImage.png'
import {DeleteChirp} from '../../actions/ChirpsActions';
import trashIcon from '../../assets/trashIcon.png'

export const UserChirps: React.FC = () => {
  const user = useSelector((state: RootStore) => state.user );
  const dispatch = useDispatch();
  const chirpsState = useSelector((state: RootStore) => state.userChirps);

  let currentListItem = "";

  const loadData = () => {
    dispatch(GetUsersChirps());
  }

  const deleteChirpDispatcher = async () => {
    console.log(currentListItem);
    await dispatch(DeleteChirp(currentListItem));
    window.location.reload();
  }
    
    // const getUserBioDispatcher = (username: string) => {
    //   dispatch(GetUserBio(username));
    // }

  // eslint-disable-next-line
  React.useEffect(() => loadData(),[]);
  // React.useEffect(() => getUserBioDispatcher(chirpsState.chirps?.[0].username),[]);

  return (<>
    <div id="user-chirps-box">
        <img id="user-img-title" alt="profile pic" src={defaultUserImage}></img>
        <span id="user-chirp-title">Chirps by <strong>@{chirpsState.chirps?.[0].username}</strong></span>
        <a href="/"><img src={chirperLogo} id="user-chirper-logo"></img></a>
    </div>
    <div id="user-chirps-wrapper" className="pt-5 mt-5">
    {chirpsState.chirps && chirpsState.chirps.sort((a, b) => Number(a.timestamp) < Number(b.timestamp) ? 1 : -1).map((chirp, index) => {
      return (
      <div className="chirp user-chirps" key={index}>
        <Row>
          <Col xs="2">
          <img className="chirp-user-img" alt="profile pic" src={defaultUserImage} width="64px"></img>
          </Col>
          <Col xs="8">
            <span className="chirp-user">@{chirp.username}</span>
            <br></br>
            <span className="chirp-body">{chirp.body}</span>
            <br></br>
            <span className="chirp-time">{(new Date(Number(chirp.timestamp))).toLocaleString('en-US', {timeZone: 'EST'})}</span>
          </Col>
          <Col xs="2" className="my-auto">
          {(() => { if (user.user?.username == chirp.username) {
                  return <><button className="delete-button" onClick={() => {currentListItem = chirp.timestamp; deleteChirpDispatcher();}}><img src={trashIcon} height="24px"></img></button></>
                }
                })()}
          </Col>
        </Row>
      </div>
      )})}
      <p className="text-center pt-4 pb-2">No more chirps to show.</p>
      </div>
  </>);
}