import React, { useState, useEffect } from "react";
import { Card } from "rebass";
import { db } from "../../../firebase";
import {
  StandardPlayingCardContainer,
  HandPlayingCardText,
  WildPlayingCardContainer,
} from "../HandStyles.js";

const HandPlayingCard = ({ id, type, text, points, onClick, selected }) => {
  return (
    <>
      {type === "Wild" ? (
        <WildPlayingCardContainer onClick={onClick} selected={selected}>
          <HandPlayingCardText type={type} bold={600}>
            {type}
          </HandPlayingCardText>
          <br></br>
          <HandPlayingCardText>
            <input></input>
          </HandPlayingCardText>
          <HandPlayingCardText type={type}>
            {Math.floor(Math.random() * 10)} pts
          </HandPlayingCardText>
        </WildPlayingCardContainer>
      ) : (
        <StandardPlayingCardContainer
          type={type}
          onClick={onClick}
          selected={selected}
        >
          <HandPlayingCardText type={type} bold={600}>
            {type}
          </HandPlayingCardText>
          <br></br>
          <HandPlayingCardText>{text}</HandPlayingCardText>
          <HandPlayingCardText type={type}>{points}</HandPlayingCardText>
        </StandardPlayingCardContainer>
      )}
    </>
  );
};

export default HandPlayingCard;
