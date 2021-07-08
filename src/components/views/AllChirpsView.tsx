import React from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllChirps, PostChirp } from '../../actions/ChirpsActions';
import { GetUserBio } from '../../actions/UserActions';
import { RootStore } from '../../store/store';
import Auth from '@aws-amplify/auth';
import chirperLogo from '../../assets/chirperLogo.png';
import defaultUserImage from '../../assets/defaultUserImage.png'


export const AllChirpsView: React.FC = () =>{
    const [inputState, setInputState] = React.useState({
        value: ""
      });

    const dispatch = useDispatch();
    const chirpsState = useSelector((state: RootStore) => state.chirps);

    const getAllChirpsDispatcher = () => {
      dispatch(GetAllChirps());
    }
  
    const user = useSelector((state: RootStore) => state.user);
  
    const getUserBioDispatcher = (username: string) => {
      dispatch(GetUserBio(username));
    }
  
    React.useEffect(() => {
      Auth.currentAuthenticatedUser({
        bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
      }).then(user => {getUserBioDispatcher(user.username);})
        .catch(err => console.log(err));
    }, []);

    const changeListener = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputState({value: event.currentTarget.value});
    }

    const postChirpListener = async () => {
      await dispatch(PostChirp(
      {
        "username": user.user?.username,
        "body": inputState.value,
        "timestamp": String(Date.now()),
        "likes": [],
        "comments": []
      }))
      setInputState({value: ""});
      getAllChirpsDispatcher();
    }

    React.useEffect(() => getAllChirpsDispatcher(), []);

    return (
      <>
      <div id="main-component-title">
        <span>All chirps</span>
        <a href="/"><img src={chirperLogo} id="user-chirper-logo"></img></a>
      </div>
        { /* Post a chirp module */ }
        <div id="post-chirp">
          <h5 id="new-chirp-label">Post a new chirp</h5>
          <textarea value={inputState.value} onChange={changeListener} className="new-chirp-input form-validation"></textarea>
          <br></br>
          <button onClick={postChirpListener} className="new-chirp-button btn">Post</button>
        </div>

        { /* Lists all of the chirps */ }
        {chirpsState.chirps && chirpsState.chirps.sort((a, b) => Number(a.timestamp.S) < Number(b.timestamp.S) ? 1 : -1).map((chirp, index) => {
            return <div className="chirp" key={index}>
            <Row className="mr-0">
              <Col className="my-auto" xs="2">
              <img className="chirp-user-img" alt="pfp" src={defaultUserImage}></img>
              </Col>
              <Col className="ml-0 pl-0" xs="8">
                <span className="chirp-user"><a href={`/${chirp.username.S}`}>@{chirp.username.S}</a></span>
                <br></br>
                <span className="chirp-body">{chirp.body.S}</span>
                <br></br>
                <span className="chirp-time">{(new Date(Number(chirp.timestamp.S))).toLocaleString('en-US', {timeZone: 'EST'})}</span>
              </Col>
              <Col xs="2" className="my-auto">
                <span className="likes-label">{chirp.likes.L.length}<button className="like-button">♥</button></span>
              </Col>
            </Row>
            </div>
        })}
      <p className="text-center pt-4 pb-2">No more chirps to show.</p>
      </>)
}
