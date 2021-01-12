import React, { useState, useEffect } from "react";
import { Card } from "rebass";
import { db } from "../../../firebase";
import {
  GamePlayingCardContainer,
  GamePlayingCardText,
} from "../GameStyles.js";

let uniqueCardKey = "CjC4fXoHDGhuFbvAV2mtTxEli122";

const GamePlayingCard = ({ id, type, text, points, onClick }) => {
  return (
    <GamePlayingCardContainer type={type}>
      <GamePlayingCardText type={type} bold={600}>
        {type}
      </GamePlayingCardText>
      <br></br>
      <GamePlayingCardText>{text}</GamePlayingCardText>
      <GamePlayingCardText type={type}>{points}</GamePlayingCardText>
    </GamePlayingCardContainer>
  );
};

export default GamePlayingCard;
