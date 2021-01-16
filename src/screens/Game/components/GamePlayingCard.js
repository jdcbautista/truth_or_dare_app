import React, { useState, useEffect } from "react";
import { Card } from "rebass";
import { db } from "../../../firebase";
import {
  StandardPlayingCardContainer,
  GamePlayingCardText,
  WildPlayingCardContainer,
} from "../GameStyles.js";

const GamePlayingCard = ({
  id,
  type,
  gamePhase,
  currentlySelectedCard,
  text,
  points,
  onClick,
  selected,
}) => {
  return (
    <>
      {type === "wild" ? (
        <WildPlayingCardContainer
          onClick={onClick}
          selected={selected}
          gamePhase={gamePhase}
          currentlySelectedCard={currentlySelectedCard}
        >
          <GamePlayingCardText type={type} bold={600}>
            {type}
          </GamePlayingCardText>
          <br></br>
          <GamePlayingCardText>
            <input></input>
          </GamePlayingCardText>
          <GamePlayingCardText type={type}>
            {Math.floor(Math.random() * 10)} pts
          </GamePlayingCardText>
        </WildPlayingCardContainer>
      ) : (
        <StandardPlayingCardContainer
          type={type}
          gamePhase={gamePhase}
          currentlySelectedCard={currentlySelectedCard}
          onClick={onClick}
          selected={selected}
        >
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
