import React from 'react'
import '../App.css';

function JudgePhase(props) {
  
  function triggerCallback(value) {
    props.handleCallback(value)
  }

  return (
    <div className="Game">
        <h3>
          Judgement Phase:</h3>
          <p>
          <ul><li>
          Judges vote on hotseat player's truth/dare reaction</li><li>
          Record and update scores</li><li>
          Load Results Page and pass true/false flag for gameover conditions</li>
          </ul>
        
        </p> 
        <button onClick={() => triggerCallback('ActionPhase')} className="debug"> CONTINUE </button>
        <button onClick={() => triggerCallback('Results')} className="debug"> CONTINUE </button>
    </div>
  );
}

export default JudgePhase;
