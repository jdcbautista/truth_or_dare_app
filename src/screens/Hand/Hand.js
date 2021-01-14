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
import { generateRandomNumber } from "../../helpers";
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
  const [fieldCards, setFieldCards] = useState(
    [1, 2, 3, 4].map((el) => {
      return {
        id: el,
        type:
          generateRandomNumber() < 3
            ? "Truth"
            : generateRandomNumber() < 6
            ? "Dare"
            : "Wild",

        text: "this is the selected card",
        points: 5,
      };
    })
  );

  console.log({ playerCards });
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

    // .fromTo(
    //   ".gameContainerFadeIn",
    //   { filter: "blur(40px)" },
    //   { filter: "blur(0px)", duration: 2 }
    // );
  }, []);
  console.log(isSelected);

  const handleDeal = () => {
    FirestoreService.getHand("kYGX7QmQOFZwWZm5lJCZBkXoRvm2", "game1").then(
      (response) => {
        console.log(response);
        setPlayerCards(response);
      }
    );
  };

  return (
    <HandContainer className="handContainerFadeIn">
      <StyledFlex>
        {fieldCards.map((card) => (
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
                onClick={() => setIsSelected(!isSelected)}
              />
              {/* {/* <CARD COMPONENT GOES HERE></CARD> */}
            </PlayerCard>
          </Box>
        ))}
      </StyledFlex>

      {/* <HotseatCard width={[1, 2 / 5]} p={3}>
        {/* <GameHotseatVideoBox className="fadeInHotseatVideo">
            <Participant
              isGameVideo
              userId={userId}
              user={localParticipant}
              participant={room && room?.localParticipant}
              videoHeight={200}
              videoWidth={200}
            />
          </GameHotseatVideoBox> */}
      {/* </HotseatCard> */}

      {/* <div>
        <GameCardBox> */}
      {/* handComponent holds selectedCard state property and renders cards in hand */}
      {/* <Hand cardList=[] */}
      {/* <button onClick={handleDeal}>Deal cards</button> */}

      {/* {playerCards.map((card) => (
            <GamePlayingCard
              id={card?.id}
              // selected={isSelected}
              type={card?.type}
              text={card?.text}
              points={Math.floor(Math.random() * 10) + "pts"}
              onClick={() => console.log("toggle [selectedCard] state")}
            />
          ))} */}
      {/* </GameCardBox>
      </div> */}
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
