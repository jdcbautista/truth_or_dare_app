import React, { useState, useEffect } from "react";
import { Card } from "rebass";
import { db } from "../../../firebase";
import {
  StandardPlayingCardContainer,
  GamePlayingCardText,
  WildPlayingCardContainer,
  PlayedBy
} from "../GameStyles.js";
import * as FirestoreService from '../../../firebase.js'
import {StyledBadge, StyledScoreContainer} from '../../Lobby/LobbyStyles.js'

const GamePlayingCard = ({
  id,
  type,
  gamePhase,
  currentlySelectedCard,
  text,
  points,
  onClick,
  selected,
  userID,
  cardID,
  //user=localuserID
  user,
  username
}) => {

  const [editCard, setEditCard] = useState(false)
  const [cardText, setCardText] = useState(undefined)
  const [cardFinished, setCardFinished] = useState(false)

  const handleEditClick = async () => {
    setEditCard(!editCard)
    console.log('edit click')
  }

  const handleCardChange = async (e) => {
    console.log(e.target.value)
    setCardText(e.target.value)
  }

  const handleSaveClick = async () => {
    setEditCard(!editCard)
    setCardFinished(true)
    await FirestoreService.setWildCardText(FirestoreService.GAMEROOM, userID, cardID, cardText).catch(err => console.log(err))
  }

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
            {editCard 
            ? <form><input onChange={(e) => handleCardChange(e)}></input><button onClick={() => handleSaveClick()}>Save</button></form> 
            : <GamePlayingCardText onClick={user?.id===userID?() => handleEditClick():()=>console.log('unable to edit')}>{text ? text : `Waiting for ${username} to edit...`}</GamePlayingCardText>}
          </GamePlayingCardText>
          <PlayedBy>Played By: {username}</PlayedBy>
          <GamePlayingCardText type={type}>
            6 pts
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