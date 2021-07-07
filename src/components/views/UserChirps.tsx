import React from 'react';
import { Row, Col } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { GetUsersChirps } from '../../actions/UserChirpsActions';
import { RootStore } from '../../store/store';

export const UserChirps: React.FC = () => {
  const dispatch = useDispatch();
  const chirpsState = useSelector((state: RootStore) => state.userChirps);

  const loadData = () => {
    dispatch(GetUsersChirps());
  }

  // eslint-disable-next-line
  React.useEffect(() => loadData(),[]);

  return (<>
    {chirpsState.chirps && chirpsState.chirps.map((chirp, index) => {
      console.log(chirp);
      return <div className="chirp" key={index}>
        <Row>
          <Col xs="2">
          <img alt="profile pic" src={"https://64.media.tumblr.com/1c0a550b6a6b075c35bb0f62e6b14047/580b88b831872a09-e8/s250x400/04b15506e7f9c7e11a3aa86f4373c0acb4ddb9c9.png"} width="64px"></img>
          </Col>
          <Col xs="8">
            <span className="chirp-user">@{chirp.username}</span>
            <br></br>
            <span className="chirp-body">{chirp.body}</span>
            <br></br>
            <span className="chirp-time">{(new Date(Number(chirp.timestamp))).toLocaleString('en-US', {timeZone: 'EST'})}</span>
          </Col>
          <Col xs="2" className="my-auto">
            <span className="likes-label">{chirp.likes && chirp.likes.length} <button className="like-button">♥</button></span>
          </Col>
        </Row>
      </div>
    })}
  </>);
}