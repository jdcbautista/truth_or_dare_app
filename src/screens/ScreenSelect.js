import React from "react";
import Title from "./Title.js";
import Lobby from "./Lobby.js";
import GameStart from "./GameStart.js";
import RoundStart from "./RoundStart.js";
import VotePhase from "./VotePhase.js";
import ActionPhase from "./ActionPhase.js";
import JudgePhase from "./JudgePhase.js";
import Results from "./Results.js";

const ScreenSelect = (props) => {
  console.log(props);

  const currentScreen = props.currentScreen;
  switch (currentScreen) {
    case "Title":
      return (
        <div>
          <Title handleCallback={props.handleCallback} />
        </div>
      );
    case "Host":
      return (
        <div>
          <Lobby
            identity={props.identity}
            token={props.token}
            setToken={props.setToken}
            handleCallback={props.handleCallback}
          />
        </div>
      );
    case "Join":
      return (
        <div>
          <Lobby
            handleCallback={props.handleCallback}
            identity={props.identity}
            token={props.token}
            setToken={props.setToken}
            handleCallback={props.handleCallback}
            role="join"
          />
        </div>
      );
    case "GameStart":
      return (
        <div>
          <GameStart handleCallback={props.handleCallback} />
        </div>
      );
    case "RoundStart":
      return (
        <div>
          <RoundStart handleCallback={props.handleCallback} />
        </div>
      );
    case "VotePhase":
      return (
        <div>
          <VotePhase handleCallback={props.handleCallback} />
        </div>
      );
    case "ActionPhase":
      return (
        <div>
          <ActionPhase handleCallback={props.handleCallback} />
        </div>
      );
    case "JudgePhase":
      return (
        <div>
          <JudgePhase handleCallback={props.handleCallback} />
        </div>
      );
    case "Results":
      return (
        <div>
          <Results handleCallback={props.handleCallback} gameover="false" />
        </div>
      );
    case "FinalResults":
      return (
        <div>
          <Results handleCallback={props.handleCallback} gameover="true" />
        </div>
      );
    default:
      return (
        <div>
          <Title handleCallback={props.handleCallback} />
        </div>
      );
  }
};
export default ScreenSelect;
