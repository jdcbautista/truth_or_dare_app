import React from 'react'
import '../App.css';

function GameStart(props) {
  
  function triggerCallback(value) {
    props.handleCallback(value)
  }

  return (
    <div className="Game">
                <h3>
          GAME START <br></br>
          I will run the following only once:</h3>
          <p>
          <ul><li>
          Pull and deal cards from backend</li><li>
          Load players' camera/browser permissions</li><li>
          Determine Player Order</li>
          (stretch goal) I will play some cool animation to initialize the game
          </ul>
          Once I finish the above, I will send the player to RoundStart.js and trigger the start of the game
        </p> 
        <button onClick={() => triggerCallback(2)} className="debug"> BACK </button>
        <button onClick={() => triggerCallback(4)} className="debug"> CONTINUE </button>
    </div>
  );
}

export default GameStart;
