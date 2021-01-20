import React, { useState, useEffect } from "react";
import { Card } from "rebass";
import { db } from "../../../firebase";
import {
  StandardPlayingCardContainer,
  VotingCardText,
  WildPlayingCardContainer,
} from "../GameStyles.js";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";

const VotingCard = ({ yesNoSelected, onClick, type }) => {
  return (
    <>
      {yesNoSelected === "yes" ? (
        <StandardPlayingCardContainer
          onClick={onClick}
          type={"truth"}
          currentlySelectedCard={true}
        >
          <VotingCardText yesNoSelected={yesNoSelected} bold={600}>
            <FiThumbsUp size={160} />
          </VotingCardText>
        </StandardPlayingCardContainer>
      ) : (
        <StandardPlayingCardContainer
          onClick={onClick}
          type={"dare"}
          text-align="center"
          currentlySelectedCard={true}
        >
          <VotingCardText yesNoSelected={yesNoSelected} bold={600}>
            <FiThumbsDown size={160} />
          </VotingCardText>
        </StandardPlayingCardContainer>
      )}
    </>
  );
};

export default VotingCard;
