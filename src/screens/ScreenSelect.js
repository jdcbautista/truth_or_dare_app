import React from 'react'
import Title from './Title.js'
import Host from './Host.js'
import Join from './Join.js'
import GameStart from './GameStart.js'
import RoundStart from './RoundStart.js'
import VotePhase from './VotePhase.js'
import ActionPhase from './ActionPhase.js'
import JudgePhase from './JudgePhase.js'
import Results from './Results.js'

const ScreenSelect = (props) => {
  console.log(props)

  const currentScreen = props.currentScreen;
  switch (currentScreen) {
    case 0:
      return (
        <div>
        <Title handleCallback={props.handleCallback}/>
        </div>
      );
    case 1:
      return (
        <div>
          <Host handleCallback={props.handleCallback} role='host'/>
        </div>
      );  
    case 2:
      return (
        <div>
          <Join handleCallback={props.handleCallback} role='join'/>
        </div>
      );
    case 3:
      return (
        <div>
          <GameStart handleCallback={props.handleCallback}/>
        </div>
      );
    case 4:
      return (
        <div>
        <RoundStart handleCallback={props.handleCallback}/>
        </div>
      );
    case 5:
      return (
        <div>
          <VotePhase handleCallback={props.handleCallback}/>
        </div>
      );  
    case 6:
      return (
        <div>
          <ActionPhase handleCallback={props.handleCallback}/>
        </div>
      );
    case 7:
      return (
        <div>
          <JudgePhase handleCallback={props.handleCallback}/>
        </div>
      );
    case 8:
      return (
        <div>
          <Results handleCallback={props.handleCallback} gameover="false" />
        </div>
      );
    case 9:
      return (
        <div>
          <Results handleCallback={props.handleCallback} gameover="true" />
        </div>
      );
  }


}
export default ScreenSelect;