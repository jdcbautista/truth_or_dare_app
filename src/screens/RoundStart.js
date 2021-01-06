import React from 'react'
import '../App.css';

function RoundStart(props) {
  
  function triggerCallback(value) {
    props.handleCallback(value)
  }

  return (
    <div className="Game">
        <h3>
          Round Start:</h3>
          <p>
          <ul><li>
          Display round counter number</li><li>
          Move new player to hot seat</li><li>
          Judges can play a card</li><li>
          Load voting phase after timer ends or judges all play a card</li>
          </ul>
        
        </p> 
        <button onClick={() => triggerCallback('GameStart')} className="debug"> BACK </button>
        <button onClick={() => triggerCallback('VotePhase')} className="debug"> CONTINUE </button>
    </div>
  );
}

export default RoundStart;
