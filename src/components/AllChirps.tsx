import React from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllChirps } from '../actions/ChirpsActions';
import { RootStore } from '../store/store';

  

export const AllChirps: React.FC = () => {
    const dispatch = useDispatch();
    const chirpsState = useSelector((state: RootStore) => state.chirps);
  
    const clickListener = () => {
      dispatch(GetAllChirps());
    }
  
    React.useEffect(() => clickListener(),[]);

    return (
        <>
          <div className="post-chirp">
            <h5 className="new-chirp-label">Post a new chirp</h5>
            <textarea className="new-chirp-input form-validation"></textarea>
            <br></br>
            <button className="new-chirp-button btn btn-primary">Post</button>
          </div>
          {chirpsState.chirps && chirpsState.chirps?.map(chirp => {
              return <div className="chirp" key={chirp.username.S}>
              <Row>
                <Col xs="2">
                <img src={"https://64.media.tumblr.com/1c0a550b6a6b075c35bb0f62e6b14047/580b88b831872a09-e8/s250x400/04b15506e7f9c7e11a3aa86f4373c0acb4ddb9c9.png" || chirp.img.S} width="64px"></img>
                
                </Col>
                <Col xs="8">
                  <span className="chirp-user">@{chirp.username.S}</span>
                  <br></br>
                  <span className="chirp-body">{chirp.body.S}</span>
                  <br></br>
                  <span className="chirp-time">{(new Date(Number(chirp.timestamp.S))).toLocaleString('en-US', {timeZone: 'EST'})}</span>
                </Col>
                <Col xs="2" className="my-auto">
                  <span className="likes-label">{chirp.likes.length} <button className="like-button">♥</button></span>
                </Col>
              </Row>
              </div>
          })}
        </>
    );
}