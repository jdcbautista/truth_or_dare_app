
import React, { useState } from 'react';
import ScreenSelect from './screens/ScreenSelect.js'

const Game = () => {
  const [screenID, setScreenID] = useState('title')

//Game function indexes various states:
// title, lobby, gameInit, gameActive, gameResults, etc

  const handleCallback = (value) => {
    setScreenID(value)
  }
    return (
      <div className="Game">

        <ScreenSelect currentScreen={ screenID } handleCallback= {handleCallback}/>

      </div>
    );
}

export default Game;
