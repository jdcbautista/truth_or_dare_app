import React, { useEffect, useState, Suspense } from "react";
import Timer from "./components/Timer";
import Participant from "../Lobby/components/Participant";
import { gsap } from "gsap";
import { Flex, Box } from "reflexbox";
import {
  GameContainer,
  TextContainer,
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
  approved,
  votePhaseEnd,
  hotseat,
  cardPoints,
  userId,
  localPlayer,
  room,
  localParticipant,
  endVoting,
  user,
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
    <div>
      <div>
      {(gamePhase == 'voting') && (fieldCards.length == 3) && 
        <Flex flexWrap='wrap'>
          <Box flex='1' height="80px">
          <TextContainer className="timerBarDeplete">{`${hotseat} has chosen a fate!`}</TextContainer></Box><Box flex='1' height="80px">
            
          <Timer votePhaseEnd={votePhaseEnd} endVoting={endVoting} />
          
          </Box><Box flex='1' height="80px">
          <TextContainer className="timerBarDeplete">{`Did ${hotseat} successfully deliver?`}</TextContainer>
          </Box>
          {/* <Box p={3}>
          <TextContainer className="timerBarDeplete">{`${hotseat} has chosen a fate!`}</TextContainer></Box><Box>
          <Timer votePhaseEnd={votePhaseEnd} />
          <TextContainer className="timerBarDeplete">{`Did ${hotseat} successfully deliver?`}</TextContainer>
          </Box> */}
        </Flex>
      }
      </div>
    <TextContainer className="timerBarDeplete">
      {(gamePhase == 'playCard') && (fieldCards.length < 3) && 
        `Everyone but ${hotseat} is choosing a card!`
      }
      {(gamePhase == 'playCard') && (fieldCards.length == 3) && 
        `${hotseat} is in the hotseat choosing a card!`
      }
      {/* {(gamePhase == 'voting') && (fieldCards.length == 3) && 
        `${hotseat} has chosen a fate!`
      }
      {(gamePhase == 'voting') && (fieldCards.length == 3) && 
        `Did ${hotseat} successfully deliver?`
      } */}
      {(gamePhase == 'pre-cleanUp') && (approved) && 
        `The majority have voted!  ${hotseat} succeeded and gained ${cardPoints} points!`
      }
      {(gamePhase == 'pre-cleanUp') && (!approved) && 
        `The majority have voted!  ${hotseat} failed!`
      }
      {(gamePhase == 'gameOver') &&
        `${hotseat} wins!`}
    </TextContainer>
    <GameContainer className="gameContainerFadeIn">
      
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
                  userID={card?.playedBy}
                  cardID={card?.hashId}
                  currentlySelectedCard={isCurrentlySelectedCard()}
                  type={card?.type}
                  text={card?.text}
                  username={card?.username}
                  points={card?.points}
                  onClick={
                    isCurrentlySelectedCard
                      ? () => handleSelectCard(card?.hashId)
                      : null
                  }
                  user={user}
                />
              )}
            </PlayerCard>
          </Box>
        ))}
      </StyledFlex>
    </GameContainer>
    </div>
  );
};
export default Game;
