import React from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllChirps, PostChirp } from '../actions/ChirpsActions';
import { RootStore } from '../store/store';
import { pfpDefault } from '../shared/constants';


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

    //eslint-disable-next-line
    React.useEffect(getAllChirpsDispatcher,[]);

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
              //eslint-disable-next-line
              return (<div className="chirp" key={chirp.timestamp.S}>
              <Row className="mr-0">
                <Col className="my-auto" xs="2">
                <img className="chirp-user-img" alt="pfp" src={pfpDefault}></img>
                </Col>
                <Col className="ml-0 pl-0" xs="8">
                  <span className="chirp-user"><a href="#">@{chirp.username.S}</a></span>
                  <br></br>
                  <span className="chirp-body">{chirp.body.S}</span>
                  <br></br>
                  <span className="chirp-time">{(new Date(Number(chirp.timestamp.S))).toLocaleString('en-US', {timeZone: 'EST'})}</span>
                </Col>
                <Col xs="2" className="my-auto">
                  <span className="likes-label">{/*{chirp.likes.L.length}*/} {chirp.likes.L.length}<button className="like-button">♥</button></span>
                </Col>
              </Row>
              </div>
              )
          })}
        </>
    );
}