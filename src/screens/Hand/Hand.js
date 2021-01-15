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
      await FirestoreService.loadDeckFromResources();
      if (userId) {
        handleGetHand();
        console.log("seeing if player has a current hand ");
      }

      if (playerCards.length < 5 && userId) {
        console.log("running handle deal cards");
        handleSingleDeal(3);
        handleGetHand();
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
      const setCards = await setPlayerCards(snapshot);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeal = () => {
    try {
      FirestoreService.getHand(userId, FirestoreService.GAMEROOM).then(
        (response) => {
          console.log("getting hand in handleDeal");
          setPlayerCards(response);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  //read player's (top/first submitted) field card from db into state
  // JS - removed 1/14
  // const handleField = async () => {
  //   console.log("setFieldToState");
  //   const snapshot = await FirestoreService.readFieldCard(
  //     userId,
  //     FirestoreService.GAMEROOM
  //   );
  //   console.log('')
  // };

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
      // const fieldUpdate = await handleField();
      const handUpdate = await handleDeal();

      gsap
        .timeline()
        .fromTo(
          ".handContainerFadeIn",
          { opacity: 0, transform: "translateY(0px)" },

          {
            opacity: 1,
            transform: "translateY(400px)",
            duration: 0.5,
          }
        )

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
                selected={isSelected}
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

//background
// Set 3 second timer
// Lobby to game animation transition
// Draw random cards into hand
// Load playingField

//playingField has containers
//  judgePanel contains judgePlayer1 - judgePlayer3
//  hotSeat container contains player
//  handHandler

// Make callback or change firestore state,
// Change lobby's gameState from sessionInit to... roundStart

//roundStart
//

//roundEnd : game logic checks if game ends or returns to roundStart

//gameEnd : Winners stand triumphantly over losers

//     <div
//       className="sessionInit"
//       style={{ backgroundColor: "gray", padding: "10px", paddingTop: "10%" }}
//     >
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           margin: "10px",
//           backgroundColor: "pink",
//           justifyContent: "center",
//           height: "600px",
//           borderRadius: "15px",
//           textAlign: "center",
//         }}
//       >
//         <div
//           style={{
//             backgroundColor: "lightblue",
//             margin: "10px",
//             width: "100vw",
//             borderRadius: "15px",
//             textAlign: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           <p>Player list component</p>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               width: "100%",
//               margin: "10px",
//               borderRadius: "15px",
//               textAlign: "center",
//               justifyContent: "space-evenly",
//             }}
//           >
//             <div
//               style={{
//                 margin: "10px",
//                 backgroundColor: "lavender",
//                 height: "500px",
//                 borderRadius: "15px",
//                 justifyContent: "space-between",
//                 textAlign: "center",
//               }}
//             >
//               {/* <p>Child 2</p> */}
//               <div
//                 style={{
//                   backgroundColor: "aquamarine",
//                   justifyContent: "space-evenly",
//                   margin: "10px",
//                   width: "250px",
//                   borderRadius: "15px",
//                   height: "150px",
//                 }}
//               >
//                 {/* <Participant
//                   userId={userId}
//                   participant={participants[0]}
//                   videoHeight={200}
//                 /> */}
//               </div>
//               <div
//                 style={{
//                   backgroundColor: "white",
//                   margin: "20px 10px 10px 10px",
//                   borderRadius: "15px",
//                   height: "300px",
//                 }}
//               >
//                 <p>Card component</p>
//               </div>
//             </div>
//             <div
//               style={{
//                 margin: "10px",
//                 backgroundColor: "lavender",
//                 height: "500px",
//                 width: "250px",
//                 borderRadius: "15px",
//                 textAlign: "center",
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor: "aquamarine",
//                   margin: "10px",
//                   borderRadius: "15px",
//                   height: "150px",
//                 }}
//               >
//                 <p>Player Component</p>
//               </div>
//               <div
//                 style={{
//                   backgroundColor: "white",
//                   margin: "20px 10px 10px 10px",
//                   borderRadius: "15px",
//                   height: "300px",
//                 }}
//               >
//                 <p>Card component</p>
//               </div>
//             </div>
//             <div
//               style={{
//                 margin: "10px",
//                 backgroundColor: "lavender",
//                 height: "500px",
//                 width: "250px",
//                 borderRadius: "15px",
//                 textAlign: "center",
//               }}
//             >
//               <div
//                 style={{
//                   backgroundColor: "aquamarine",
//                   margin: "10px",
//                   borderRadius: "15px",
//                   height: "150px",
//                 }}
//               >
//                 <p>Player Component</p>
//               </div>
//               <div
//                 style={{
//                   backgroundColor: "white",
//                   margin: "20px 10px 10px 10px",
//                   borderRadius: "15px",
//                   height: "300px",
//                 }}
//               >
//                 <p>Card component</p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           style={{
//             margin: "10px",
//             backgroundColor: "lightblue",
//             width: "400px",
//             borderRadius: "15px",
//             textAlign: "center",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//           }}
//         >
//           <p>hotseat player component</p>
//           <div
//             style={{
//               margin: "10px",
//               backgroundColor: "lavender",
//               height: "500px",
//               width: "250px",
//               borderRadius: "15px",
//               textAlign: "center",
//             }}
//           >
//             <p>Player Component</p>
//             <div
//               style={{
//                 backgroundColor: "white",
//                 margin: "20px 10px 10px 10px",
//                 borderRadius: "15px",
//                 height: "410px",
//               }}
//             >
//               <p>Twilio component</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div
//         style={{
//           backgroundColor: "pink",
//           borderRadius: "15px",
//           textAlign: "center",
//           height: "150px",
//         }}
//       >
//         <p>hand component</p>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "row",
//             justifyContent: "center",
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               margin: "20px 10px 10px 10px",
//               borderRadius: "15px",
//               height: "50px",
//             }}
//           >
//             <p>Card component</p>
//           </div>
//           <div
//             style={{
//               backgroundColor: "white",
//               margin: "20px 10px 10px 10px",
//               borderRadius: "15px",
//               height: "50px",
//             }}
//           >
//             <p>Card component</p>
//           </div>
//           <div
//             style={{
//               backgroundColor: "white",
//               margin: "20px 10px 10px 10px",
//               borderRadius: "15px",
//               height: "50px",
//             }}
//           >
//             <p>Card component</p>
//           </div>
//           <div
//             style={{
//               backgroundColor: "white",
//               margin: "20px 10px 10px 10px",
//               borderRadius: "15px",
//               height: "50px",
//             }}
//           >
//             <p>Card component</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
