import React, { useState } from 'react'
import '../App.css';

function Results(props) {
  
  function triggerCallback(value) {
    props.handleCallback(value)
  }

  return (
    <div className="Game">
        <h3>
          Results Page:</h3>
          <p>
          <ul><li>
          Display "results" if not gameover, else display "Final Results"</li><li>
          Update global variables</li><li>
          Load RoundStart if not gameover, else display button to return to title</li>
          </ul>
        
        </p> 
        <button onClick={() => triggerCallback(6)} className="debug"> BACK </button>
        <button onClick={() => triggerCallback(3)} className="debug"> CONTINUE </button>
    </div>
  );
}

export default Results;
