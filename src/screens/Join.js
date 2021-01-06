import React, { useState } from 'react'
import '../App.css';

function Join(props) {
  
  function triggerCallback(value) {
    props.handleCallback(value)
  }

  return (
    <div className="Game">
        <p>
        LOBBY / WAITING ROOM / QUEUE<br></br>
          I will handle the logic that sends a player into a game
        </p>
        <button onClick={() => triggerCallback(0)} className="debug"> BACK </button> 
        <button onClick={() => triggerCallback(3)} className="debug"> START GAME </button>
    </div>
  );
}

export default Join;
