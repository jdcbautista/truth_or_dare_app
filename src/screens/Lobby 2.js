import React from 'react'
import '../App.css';

function Lobby(props) {
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
        <button onClick={() => triggerCallback('Title')} className="debug"> BACK </button> 
        <button onClick={() => triggerCallback('GameStart')} className="debug"> START GAME </button>
    </div>
  );
}

export default Lobby;
