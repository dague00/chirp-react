import { describe } from '@jest/globals';
import { shallow, mount } from 'enzyme';
import { SettingsView } from '../components/views/SettingsView';
import { Provider } from 'react-redux';
// import { Store } from '../store/store';
import { Signup } from '../components/UserAuth/Signup';
import { Welcome } from '../components/UserAuth/Welcome';
import { User } from '../components/User/User';
import { Login } from '../components/UserAuth/Login';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import Nav from '../Nav';
import reportWebVitals from '../reportWebVitals';
import Amplify from 'aws-amplify';
import config from '../components/UserAuth/config.json';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import RootReducer from '../store/reducers/RootReducer';

const Store = createStore(
  RootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootStore = ReturnType<typeof RootReducer>;


// const ReduxProvider = ({ children, reduxStore }) => (
//     <Provider store={reduxStore}>{children}</Provider>
// );

describe('Rendering SettingsView', () => {

    it('Did it work?', () => {
        const rendered = shallow(
            <div id="update-bio">
            <h5 id="update-bio-label">Change bio</h5>
              <textarea 
                className="new-bio-input form-validation">
              </textarea>
              <br></br>
          </div>
        );
        const shallowWrapper = rendered.find({id: "update-bio-label"});
        // console.log(shallowWrapper);
        // console.log(rendered.debug());
        // console.log(shallowWrapper.debug());
        expect(shallowWrapper.debug()).toContain('Change bio');
    });

    it('Did it work again?', () => {
        const rendered = mount(
            <Provider store={Store}>
                <SettingsView/>
            </Provider>
        );
        // const shallowWrapper = rendered.dive().find({id: "update-bio-label"});
        // console.log(shallowWrapper);
        // console.log(rendered.debug());
        console.log(
            // rendered.dive().dive().shallow().find('BrowserRouter')
            // .find('Switch').find('Route').children().dive().debug()
            rendered
        );
        // console.log(shallowWrapper.debug())
        // expect(shallowWrapper.debug()).toContain('Change bio');
    });
});