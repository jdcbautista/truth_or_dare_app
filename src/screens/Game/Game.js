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
          console.log('snapshot going')
          await FirestoreService.autoAdvancePhase(FirestoreService.GAMEROOM, cards)
        })
      )
      .catch((error) => console.log(error));
    return () => unsubscribe;
  }, []);

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

  const handleTaskComplete = async () => {
    await FirestoreService.completeTask(FirestoreService.GAMEROOM).catch((err) =>
    setError(err)
  );
  }

  return (
    <GameContainer className="gameContainerFadeIn">
      <StyledFlex>
        {fieldCards.map((card) => (
          <Box key={card?.id} p={3} width={1 / 4} color="white" bg="primary">
            <PlayerCard>
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
            </PlayerCard>
          </Box>
        ))}
        {(gamePhase === "completeTask") &&
          <DebugButton onClick={() => handleTaskComplete()}>Complete Task</DebugButton>
        }
      </StyledFlex>
    </GameContainer>
  );
};
export default Game;