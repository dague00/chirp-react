import React from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllChirps, PostChirp } from '../../actions/ChirpsActions';
import { GetUserBio } from '../../actions/UserActions';
import { RootStore } from '../../store/store';
import Auth from '@aws-amplify/auth';


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
        <h3>All chirps</h3>
      </div>
      <div id="main-component-title">
        <h3>All chirps</h3>
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
              <img className="chirp-user-img" alt="pfp" src={"https://64.media.tumblr.com/1c0a550b6a6b075c35bb0f62e6b14047/580b88b831872a09-e8/s250x400/04b15506e7f9c7e11a3aa86f4373c0acb4ddb9c9.png"}></img>
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
      <p className="text-center pt-4 pb-2">No more twee-I mean, chirps, to show.</p>
      </>)
}
