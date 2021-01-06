import React, { useState } from 'react'
import '../App.css';

function Host(props) {
  function triggerCallback(value) {
    props.handleCallback(value)
  }
  return (
    <div className="Game">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          LOBBY / WAITING ROOM / QUEUE<br></br>
          I will handle the logic that instantiates a new game
        </p> 
        <button onClick={() => triggerCallback(0)} className="debug"> BACK </button> 
        <button onClick={() => triggerCallback(3)} className="debug"> START GAME </button>
    </div>
  );
}

export default Host;
