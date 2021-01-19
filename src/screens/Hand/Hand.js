import React, { useEffect, useState, Suspense } from "react";
import Participant from "../Lobby/components/Participant";
import { gsap } from "gsap";
import { Flex, Box } from "reflexbox";
import {
  HandContainer,
  PlayerCard,
  HotseatCard,
  HandVideoBox,
  HandCardBox,
  HandHotseatVideoBox,
  Rotate,
} from "./HandStyles";
import { StyledFlex } from "../Lobby/LobbyStyles";
import * as FirestoreService from "../../firebase";
import HandPlayingCard from "./components/HandPlayingCard";
import LobbyCard from "../Lobby/components/LobbyCard";

const Hand = ({
  players,
  participants,
  userId,
  localPlayer,
  room,
  localParticipant,
}) => {
  // const [selectedCards, setSelectedCards] = useState([]);
  const [isSelected, setIsSelected] = useState(false);
  const [playerCards, setPlayerCards] = useState([]);

  useEffect(() => {
    (async () => {
      if (userId) {
        await handleGetHand();
        console.log(playerCards);
        if (playerCards.length < FirestoreService.HANDLIMIT) {
          console.log("dealing if max hand not reached");
          await handleSingleDeal(
            FirestoreService.HANDLIMIT - playerCards.length
          );
          await handleGetHand();
        }
        console.log("getting hand with useEffect");
      }
    })();
  }, []);

  useEffect(() => {
    gsap.timeline().add().fromTo(
      ".handContainerFadeIn",
      { opacity: 0, bottom: 0 },

      {
        opacity: 1,
        filter: "blur(0px)",
        bottom: -100,
        duration: 0.8,
      }
    );
  }, []);

  //deal single card from gameDeck to user in db only
  const handleSingleDeal = async (numOfCards) => {
    try {
      await FirestoreService.dealCard(
        FirestoreService.GAMEROOM,
        userId,
        numOfCards
      );
      console.log("dealing cards");
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetHand = async () => {
    try {
      const snapshot = await FirestoreService.getHand(
        userId,
        FirestoreService.GAMEROOM
      );
      console.log("getting hand");
      await setPlayerCards(snapshot);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePlayCard = async (cardID) => {
    console.log(cardID);
    console.log(userId);
    try {
      const playCard = await FirestoreService.playCard(
        FirestoreService.GAMEROOM,
        userId,
        cardID
      );
      console.log("playing card");
      const handUpdate = handleGetHand();

      gsap
        .timeline()
        // .fromTo(
        //   ".handContainerFadeIn",
        //   { opacity: 0, transform: "translateY(100px)" },

        //   {
        //     opacity: 1,
        //     transform: "translateY(400px)",
        //     duration: 0.5,
        //   }
        // )

        .fromTo(
          ".gameContainerFadeIn",
          { filter: "blur(10px)" },
          { filter: "blur(0px)", duration: 1 }
        );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <HandContainer className="handContainerFadeIn">
      <StyledFlex>
        {playerCards.map((card) => (
          <Box p={3} width={1 / 4} color="white" bg="primary">
            <PlayerCard>
              {/*

              In the Hand component, multiple cards are rendered using GamePlayingCard
              an onClick will select a card, giving it a colored border and changing 'state' accordingly
              After a predetermined time limit, the selected card is sent to the game table by passing its props to game.js
              If no card selected, random
              When GamePlayingCard is called in Game.js, it needs to be passed props from the card selected in the Hand component 
             */}

              <HandPlayingCard
                id={card?.id}
                // selected={isSelected}
                type={card?.type}
                selected={card?.selected}
                text={card?.text}
                points={card?.points}
                onClick={() => handlePlayCard(card?.hashId)}
              />
              {/* {/* <CARD COMPONENT GOES HERE></CARD> */}
            </PlayerCard>
          </Box>
        ))}
      </StyledFlex>
    </HandContainer>
  );
};
export default Hand;