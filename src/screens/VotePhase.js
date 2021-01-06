import React from 'react'
import '../App.css';

function VotePhase(props) {
  
  function triggerCallback(value) {
    props.handleCallback(value)
  }

  return (
    <div className="Game">
        <h3>
          VOTING PHASE:</h3>
          <p>
          <ul><li>
          Briefly display round counter number</li><li>
          Move new player to hot seat</li><li>
          Load Phase 1</li>
          </ul>
        
        </p> 
        <button onClick={() => triggerCallback('RoundStart')} className="debug"> BACK </button>
        <button onClick={() => triggerCallback('ActionPhase')} className="debug"> CONTINUE </button>
    </div>
  );
}

export default VotePhase;
