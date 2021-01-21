import React, { useEffect, useState, Suspense } from "react";
import Participant from "../Lobby/components/Participant";
import { gsap } from "gsap";
import { Flex, Box } from "reflexbox";
import {
  GameOverContainer,
  GameOverButton,
} from "./GameOverStyles";
import { StyledFlex } from "../Lobby/LobbyStyles";
import * as FirestoreService from "../../firebase";

import LobbyCard from "../Lobby/components/LobbyCard";

const GameOver = ({
  startGame
}) => {
  

  return (
    <GameOverContainer className="gameOverContainerFadeIn">
      <GameOverButton onClick={startGame}>Play again?</GameOverButton>
    </GameOverContainer>
  );
};
export default GameOver;

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
