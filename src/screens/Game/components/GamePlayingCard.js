import React, { useState, useEffect } from "react";
import { Card } from "rebass";
import { db } from "../../../firebase";
import {
  StandardPlayingCardContainer,
  GamePlayingCardText,
  WildPlayingCardContainer,
  PlayedBy
} from "../GameStyles.js";
import {StyledBadge, StyledScoreContainer} from '../../Lobby/LobbyStyles.js'

const GamePlayingCard = ({ id, type, text, points, onClick, selected, username }) => {
  return (
    <>
      {type === "wild" ? (
        <WildPlayingCardContainer onClick={onClick} selected={selected}>
          <GamePlayingCardText type={type} bold={600}>
            {type}
          </GamePlayingCardText>
          <br></br>
          <GamePlayingCardText>
            <input></input>
          </GamePlayingCardText>
          <GamePlayingCardText type={text}>
            {Math.floor(Math.random() * 10)} pts
          </GamePlayingCardText>
        </WildPlayingCardContainer>
      ) : (
        <StandardPlayingCardContainer
          type={type}
          onClick={onClick}
          selected={selected}
        >
          <PlayedBy>Played By: {username}</PlayedBy>
          <GamePlayingCardText type={type} bold={600}>
            {type}
          </GamePlayingCardText>
          <br></br>
          <GamePlayingCardText>{text}</GamePlayingCardText>          
          <GamePlayingCardText type={type}>{points}</GamePlayingCardText>
          
        </StandardPlayingCardContainer>
      )}
    </>
  );
};

export default GamePlayingCard;
