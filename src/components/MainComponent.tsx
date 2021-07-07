import React from 'react';
import { AllChirpsView } from './views/AllChirpsView';

export const MainComponent: React.FC = () => {
    

    return(
    <>
     <div id="main-component-title">
        <h3>All chirps</h3>
      </div>
      <AllChirpsView />
    </>)
}