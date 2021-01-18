import React, { useState, useEffect } from "react";
import { Card } from "rebass";
import { db } from "../../../firebase";
import {
  StandardPlayingCardContainer,
  VotingCardText,
  WildPlayingCardContainer,
} from "../GameStyles.js";

const VotingCard = ({
  yesNoSelected,
  onClick,
}) => {
  return (
    <>
      {yesNoSelected === "yes" ? (
        <StandardPlayingCardContainer onClick={onClick}>
          <VotingCardText yesNoSelected={yesNoSelected} bold={600}>
            YES
          </VotingCardText>
          
        </StandardPlayingCardContainer>
      ) : (
        <StandardPlayingCardContainer onClick={onClick}>
          <VotingCardText yesNoSelected={yesNoSelected} bold={600}>
            NO
          </VotingCardText>
    
        </StandardPlayingCardContainer>
      )}
    </>
  );
};

export default VotingCard;
