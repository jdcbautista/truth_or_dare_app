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
      {type === "wild" ? (
        <WildPlayingCardContainer onClick={onClick} selected={selected}>
          <HandPlayingCardText type={type} bold={600}>
            {type}
          </HandPlayingCardText>
          <br></br>
          <HandPlayingCardText>
            Play to field, then click to edit!
          </HandPlayingCardText>
          <HandPlayingCardText type={type}>6 pts</HandPlayingCardText>
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
