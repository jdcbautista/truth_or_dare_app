import React, { useEffect, useState, Suspense } from "react";
import Cards from "./components/Cards";
import Timer from "./components/Timer";
import Participant from "../Lobby/components/Participant";
import { gsap } from "gsap";
import { Flex, Box } from "reflexbox";
import {
  GameContainer,
  PlayerCard,
  HotseatCard,
  GameVideoBox,
  GameCardBox,
  GameHotseatVideoBox,
  Rotate,
} from "./GameStyles";
import { StyledFlex } from "../Lobby/LobbyStyles";
import * as FirestoreService from "../../firebase";
import GamePlayingCard from "./components/GamePlayingCard";

const Game = ({
  players,
  participants,
  userId,
  localPlayer,
  room,
  localParticipant,
}) => {
  const [selectedCards, setSelectedCards] = useState({});
  const [playerCards, setPlayerCards] = useState([]);
  const [fieldCards, setFieldCards] = useState([]);

  /**
   * This effect subscribes us to the field of the game so that all
   * players see the same cards within the field (Game) component
   */
  useEffect(() => {
    const unsubscribe = FirestoreService.getAllFieldCards(
      FirestoreService.GAMEROOM
    )
      .then((response) =>
        response.onSnapshot((gotCards) => {
          console.log("getting field cards");
          const cards = gotCards.docs.map((card) => card.data());
          setFieldCards(cards);
        })
      )
      .catch((error) => console.log(error));
    return () => unsubscribe;
  }, []);

  /**
   * This effect tries to load a deck from resources if there is none and deals cards
   * which will replenish automatically. It aso calls handleGetHand which will keep the players
   * hand up to date with what is in the DB
   */
  useEffect(() => {
    (async () => {
      // Load a deck
      await FirestoreService.loadDeckFromResources();
      if (userId) {
        handleGetHand();
        console.log("seeing if player has a current hand ");
      }

      if (playerCards.length < 5 && userId) {
        console.log("running handle deal cards");
        handleSingleDeal(8);
        handleGetHand();
      }
    })();
  }, []);

  //deal single card from gameDeck to user in db only
  const handleSingleDeal = async (numOfCards) => {
    // await e.preventDefault();
    await FirestoreService.dealCard(
      FirestoreService.GAMEROOM,
      userId,
      numOfCards
    );
    console.log("deal single card");
    console.log(userId);
  };

  const handleGetHand = async () => {
    const snapshot = await FirestoreService.getHand(
      userId,
      FirestoreService.GAMEROOM
    );
    console.log("getting hand");
    const setCards = setPlayerCards(snapshot);
  };

  const handleSelectCard = async (cardID)=>{
   await FirestoreService.cardSelectByHotseat(FirestoreService.GAMEROOM, cardID, userId)
   console.log("card selected")
  }

  return (
    <GameContainer className="gameContainerFadeIn">
      <StyledFlex>
        {fieldCards.map((card) => (
          <Box p={3} width={1 / 4} color="white" bg="primary">
            <PlayerCard>
              <GamePlayingCard
                id={card?.id}
                // selected={isSelected}
                type={card?.type}
                // selected={isSelected}
                text={card?.text}
                points={card?.points}
                onClick={() => handleSelectCard(card?.hashId)}
              />
            </PlayerCard>
          </Box>
        ))}
      </StyledFlex>
    </GameContainer>
  );
};
export default Game;
