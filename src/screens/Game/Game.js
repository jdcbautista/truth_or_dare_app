import React, { useEffect, useState, Suspense } from "react";
import GameOver from "../GameOver/GameOver";
import Timer from "./components/Timer";
import Participant from "../Lobby/components/Participant";
import { gsap } from "gsap";
import { Flex, Box } from "reflexbox";
import {
  GameContainer,
  TextContainer,
  SmallTextContainer,
  PlayerCard,
  TimerTextbox,
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
  handleStartGame
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
          const cards = gotCards.docs.map((card) => card.data());
          setFieldCards(cards);
          console.log('localplayer hotseat in game', localPlayer.hotseat)
          await FirestoreService.autoAdvancePhase(
            FirestoreService.GAMEROOM,
            cards,
            localPlayer.hotseat
          ).catch(err => console.log(err));
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
      await FirestoreService.loadDeckFromResources().catch(err => console.log(err));
      if (userId) {
        handleGetHand();
      }

      if (playerCards.length < 5 && userId) {
        handleSingleDeal(8);
        handleGetHand();
      }
    })();
  }, []);

  //deal single card from gameDeck to user in db only
  const handleSingleDeal = async (numOfCards) => {
    await FirestoreService.dealCard(
      FirestoreService.GAMEROOM,
      userId,
      numOfCards
    ).catch(err => console.log(err));
  };

  const handleGetHand = async () => {
    const snapshot = await FirestoreService.getHand(
      userId,
      FirestoreService.GAMEROOM
    ).catch(err => console.log(err));
    const setCards = setPlayerCards(snapshot);
  };

  const handleSelectCard = async (cardID) => {
    await FirestoreService.cardSelectByHotseat(
      FirestoreService.GAMEROOM,
      cardID,
      userId
    ).catch(err => console.log(err));
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
      
    {gamePhase.phase !== 'setup' && 
      <TextContainer>
        {(gamePhase == 'playCard') && (fieldCards.length < 3) && 
          hotseat ? `Choose a card for ${hotseat}!` : ''
        }
        {(gamePhase == 'playCard') && (fieldCards.length == 3) && 
          `${hotseat} is in the hotseat choosing a card!`
        }
        {(gamePhase == 'voting') && (fieldCards.length == 3) &&
        <TimerTextbox>
          <SmallTextContainer className="timerBarDeplete">{`${hotseat} has chosen a fate!`}</SmallTextContainer>
          <Timer votePhaseEnd={votePhaseEnd} endVoting={endVoting} isHotseat={user.hotseat} />
          <SmallTextContainer className="timerBarDeplete">{`Did ${hotseat} successfully deliver?`}</SmallTextContainer>
        </TimerTextbox>
        }
        {(gamePhase == 'pre-cleanUp') && (approved) && 
          `The majority have voted!  ${hotseat} succeeded and gained ${cardPoints} point${cardPoints > 1 ? 's' : ''}!`
        }
        {(gamePhase == 'pre-cleanUp') && (!approved) && 
          `The majority have voted!  ${hotseat} failed!`
        }
        {(gamePhase == 'gameOver') && (
        <div style={{flexDirection:'column', display:'flex'}}>
          {hotseat} wins!
          <button onClick={() => handleStartGame()} style={{marginTop:'20px'}}>Play again?</button>
          {/* <GameOver startGame={handleStartGame} /> */}
        </div>
        )}
      </TextContainer>
    }
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
