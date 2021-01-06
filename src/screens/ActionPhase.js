import React, { useState } from 'react'
import '../App.css';

function ActionPhase(props) {
  
  function triggerCallback(value) {
    props.handleCallback(value)
  }

  return (
    <div className="Game">
        <h3>
          ACTION PHASE:</h3>
          <p>
          <ul><li>
          Timer starts (maybe judges can pause if the player needs time to do a dare)</li><li>
          Hotseat player performs either truth or dare</li><li>
          Either timer ends or judges push button for continuing</li><li>
          Load the voting phase (or maybe combine action phase script and judgement phase script into one):</li>
          </ul>

        </p> 
        <button onClick={() => triggerCallback(5)} className="debug"> BACK </button>
        <button onClick={() => triggerCallback(7)} className="debug"> CONTINUE </button>
    </div>
  );
}

export default ActionPhase;
