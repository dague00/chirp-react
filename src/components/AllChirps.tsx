import React from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllChirps, PostChirp } from '../actions/ChirpsActions';
import { RootStore } from '../store/store';

const userImage = 
"https://64.media.tumblr.com/1c0a550b6a6b075c35bb0f62e6b14047/580b88b831872a09-e8/s250x400/04b15506e7f9c7e11a3aa86f4373c0acb4ddb9c9.png";  

export const AllChirps: React.FC = () => {
    const [inputState, setInputState] = React.useState({
      value: ""
    });

    const dispatch = useDispatch();
    const chirpsState = useSelector((state: RootStore) => state.chirps);
  
    const getAllChirpsDispatcher = () => {
      dispatch(GetAllChirps());
    }

    const changeListener = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputState({value: event.currentTarget.value});
    }

    const postChirpListener = async () => {
       await dispatch(PostChirp(
      {
        "username": "redoral",
        "body": inputState.value,
        "timestamp": String(Date.now()),
        "likes": [],
        "comments": []
      }))

      setInputState({value: ""});
      getAllChirpsDispatcher();
    }

    console.log(chirpsState);

    React.useEffect(() => getAllChirpsDispatcher(),[]);

    return (
        <>
          <div id="chirps-box-label">
            <h3>All chirps</h3>
          </div>
          <div id="post-chirp">
            <h5 id="new-chirp-label">Post a new chirp</h5>
            <textarea value={inputState.value} onChange={changeListener} className="new-chirp-input form-validation"></textarea>
            <br></br>
            <button onClick={postChirpListener} className="new-chirp-button btn">Post</button>
          </div>
          {chirpsState.chirps && chirpsState.chirps?.map(chirp => {
              return <div className="chirp" key={chirp.timestamp.S}>
              <Row className="mr-0">
                <Col className="my-auto" xs="2">
                <img className="chirp-user-img" src={"https://64.media.tumblr.com/1c0a550b6a6b075c35bb0f62e6b14047/580b88b831872a09-e8/s250x400/04b15506e7f9c7e11a3aa86f4373c0acb4ddb9c9.png"}></img>
                </Col>
                <Col className="ml-0 pl-0" xs="8">
                  <span className="chirp-user"><a href="#">@{chirp.username.S}</a></span>
                  <br></br>
                  <span className="chirp-body">{chirp.body.S}</span>
                  <br></br>
                  <span className="chirp-time">{(new Date(Number(chirp.timestamp.S))).toLocaleString('en-US', {timeZone: 'EST'})}</span>
                </Col>
                <Col xs="2" className="my-auto">
                  <span className="likes-label">{chirp.likes.L.length} <button className="like-button">♥</button></span>
                </Col>
              </Row>
              </div>
          })}
        </>
    );
}