import React from 'react';
import { useSelector } from 'react-redux';
import { RootStore } from '../store/store';
import { Row, Col } from 'reactstrap';
import logout from '../assets/logout.png'
import settings from '../assets/settings.png'
import Auth from '@aws-amplify/auth';

export const UserComponent: React.FC = () => {
    const [userState, setUserState] = React.useState("");

    
    React.useEffect(() => {
        Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => setUserState(user.username))
        .catch(err => console.log(err));
    });

    return (
        <div id="user-box" className="p-0">
            {/* User info bio */}
            <Row id="user-box-img">
                <Col>
                    <img id="user-img" alt="pfp" 
                    src={"https://64.media.tumblr.com/1c0a550b6a6b075c35bb0f62e6b14047/580b88b831872a09-e8/s250x400/04b15506e7f9c7e11a3aa86f4373c0acb4ddb9c9.png"}>
                    </img>
                </Col>
            </Row>
            <Row className="mt-2 mb-3" id="user-box-info">
                <Col>
                    <h5 className="pt-2"><a href="#">@{userState}</a></h5>
                    <p>Hey, I'm @{userState}, and I hate my life.</p>
                </Col>
            </Row>
            {/* User settings & logout button */}
            <Row id="user-box-settings">
                <Col className="settings-icon-col pt-2">
                <span><img src={settings} id="settings-icon"></img><a href="#">Settings</a></span>
                </Col>
                <Col>
                <a href="#"><span className="float-right mr-3 logout-btn btn">Logout</span></a>
                </Col>
            </Row>
        </div>
    );
}