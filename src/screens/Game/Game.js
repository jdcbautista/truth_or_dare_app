import React, { useEffect, useState, Suspense } from "react";
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
import { StyledFlex, DebugButton } from "../Lobby/LobbyStyles";
import * as FirestoreService from "../../firebase";
import GamePlayingCard from "./components/GamePlayingCard";
import VotingCard from "./components/VotingCard";

const Game = ({
  players,
  participants,
  gamePhase,
  userId,
  localPlayer,
  room,
  localParticipant,
}) => {
  const [playerCards, setPlayerCards] = useState([]);
  const [fieldCards, setFieldCards] = useState([]);
  const [error, setError] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerLength, setTimerLength] = useState(0);

  /**
   * This effect subscribes us to the field of the game so that all
   * players see the same cards within the field (Game) component
   */
  useEffect(() => {
    const unsubscribe = FirestoreService.getAllFieldCards(
      FirestoreService.GAMEROOM
    )
      .then((response) =>
        response.onSnapshot(async (gotCards) => {
          console.log("getting field cards");
          const cards = gotCards.docs.map((card) => card.data());
          setFieldCards(cards);
          console.log("snapshot going");
          await FirestoreService.autoAdvancePhase(
            FirestoreService.GAMEROOM,
            cards
          );
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

  const handleSelectCard = async (cardID) => {
    await FirestoreService.cardSelectByHotseat(
      FirestoreService.GAMEROOM,
      cardID,
      userId
    );
    console.log("card selected");
    // const interval = setInterval(() => FirestoreService.endVoting(FirestoreService.GAMEROOM), 10000);
    // return () => clearInterval(interval);
  };

  const isCurrentlySelectedCard = () => {
    return fieldCards.every((card) => !card?.selected);
  };

  const handleVoteClick = async (yesNo) => {
    await FirestoreService.playerVote(
      FirestoreService.GAMEROOM,
      userId,
      yesNo
    ).catch((err) => setError(err));
  };

  return (
    <GameContainer className="gameContainerFadeIn">
      {/* <DebugButton onclick={Timer.start}>Start Timer</DebugButton>
        {Timer.time} {Timer.isOn}
        <DebugButton onclick={Timer.stop}>PauseTimer</DebugButton>
        <DebugButton onclick={Timer.reset}>Reset Timer</DebugButton> */}
      {/* <Timer timerRunning={timerRunning} timerLength={timerLength} /> */}
      <StyledFlex>
        {fieldCards.map((card) => (
          <Box key={card?.id} p={3} color="white" bg="primary">
            <PlayerCard>
              {card?.yesNoSelected === "yes" || card?.yesNoSelected === "no" ? (
                <VotingCard
                  yesNoSelected={card?.yesNoSelected}
                  onClick={() => handleVoteClick(card?.yesNoSelected)}
                />
              ) : (
                <GamePlayingCard
                  id={card?.id}
                  gamePhase={gamePhase}
                  selected={card?.selected}
                  currentlySelectedCard={isCurrentlySelectedCard()}
                  type={card?.type}
                  text={card?.text}
                  points={card?.points}
                  onClick={
                    isCurrentlySelectedCard
                      ? () => handleSelectCard(card?.hashId)
                      : null
                  }
                />
              )}
            </PlayerCard>
          </Box>
        ))}
      </StyledFlex>
    </GameContainer>
  );
};
export default Game;
