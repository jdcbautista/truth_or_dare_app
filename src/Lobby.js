// import React, { useState, useCallback, useEffect } from "react";
// import { getTwilioToken } from "./services/twilio";
// import * as FirestoreService from "./firebase";
// import Video from "twilio-video";
// import LobbyCard from "./screens/Lobby/LobbyCard";
// import { checkIfReady } from "./helpers";

// const Lobby = () => {
//   // The twilio state for token, room, and participants in the room
//   const [token, setToken] = useState(null);
//   const [room, setRoom] = useState(null);
//   const [participants, setParticipants] = useState([]);
//   //Error and loading handles
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   // Keep track of players and current player
//   const [localPlayer, setLocalPlayer] = useState({});
//   const [players, setPlayers] = useState([]);
//   const [username, setUsername] = useState(null);
//   const [inputDisabled, setInputDisabled] = useState(false);
//   const [userId, setUserId] = useState(null);

//   console.log({ room, token, participants });
//   console.log({ players, localPlayer, userId });

//   // This effect runs on page load and uses firebase auth
//   // to annonymously authenticate a user. It provides a unique
//   // id that is associated with the users machine and stores in into
//   // state. It also gets all of our players from a game (default is "game1")
//   // and sets the local state with those players
//   useEffect(() => {
//     FirestoreService.authenticateAnonymously()
//       .then((userCredential) => {
//         setUserId(userCredential.user.uid);
//       })
//       .catch((error) => console.log(error));

//     const unsubscribe = FirestoreService.getPlayers("game1")
//       .then((response) =>
//         response.onSnapshot((gotPlayers) => {
//           const players = gotPlayers.docs.map((player) => player.data());
//           setPlayers(players);
//         })
//       )
//       .catch((error) => console.log(error));
//     return () => unsubscribe();
//   }, []);

//   // This effect runs when there is both a token and a userId.
//   // It fetches a JWT token from our django back end using twilio
//   // API and then adds the local player as a participant in that room.
//   // It finally updates the room state to acknowledge all players.
//   useEffect(() => {
//     if (userId) {
//       getTwilioToken({ identity: userId, room: "game1" })
//         .then((token) => {
//           setToken(token);
//         })
//         .catch((error) => setError(error));
//       console.log({ players, userId });
//     }

//     const participantConnected = (participant) => {
//       setParticipants((prevParticipants) => [...prevParticipants, participant]);
//     };

//     const participantDisconnected = (participant) => {
//       setParticipants((prevParticipants) =>
//         prevParticipants.filter((p) => p !== participant)
//       );
//       setPlayers((prevPlayers) =>
//         prevPlayers.filter((p) => p?.id !== participant?.identity)
//       );
//     };

//     if (token) {
//       Video.connect(token, {
//         name: "game1",
//       }).then((room) => {
//         setRoom(room);
//         room.on("participantConnected", participantConnected);
//         room.on("participantDisconnected", participantDisconnected);
//         room.participants.forEach(participantConnected);
//       });
//     }

//     return () => {
//       setRoom((currentRoom) => {
//         if (currentRoom && currentRoom.localParticipant.state === "connected") {
//           currentRoom.localParticipant.tracks.forEach(function (
//             trackPublication
//           ) {
//             trackPublication.track.stop();
//           });
//           currentRoom.disconnect();
//           return null;
//         } else {
//           return currentRoom;
//         }
//       });
//     };
//   }, [userId, token]);

//   // This effect runs when there is both an authenticated user
//   // and players and compares ids to find and set local player
//   useEffect(() => {
//     if (userId && players) {
//       setLocalPlayer(players.filter((player) => player?.id === userId)[0]);
//     }
//   }, [players, userId]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setInputDisabled(true);
//     FirestoreService.addPlayer({ username, userId }, "game1").catch((error) =>
//       console.log(error)
//     );
//   };

//   const handleReadyClick = (e) => {
//     e.preventDefault();
//     FirestoreService.readyPlayer(userId, "game1").catch((error) =>
//       console.log(error)
//     );
//   };
//   // extract to a helpers function

//   const handleChange = (e) => {
//     setUsername(e.target.value);
//   };

//   return (
//     <div className="App">
//       <h1>Lobby</h1>

//       {!inputDisabled && (
//         <Box as="form" onSubmit={handleSubmit} py={3}>
//           <Flex mx={-2} mb={3}>
//             <Box width={1} px={2}>
//               <Label htmlFor="name">Enter your name</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 onChange={handleChange}
//                 defaultValue="Jane Doe"
//               />
//             </Box>
//           </Flex>
//         </Box>
//       )}

//       {checkIfReady() && (
//         <>
//           <button onClick={() => console.log("starting game")}>
//             Start Game
//           </button>
//         </>
//       )}
//       <StyledFlex>
//         {localPlayer && room?.localParticipant && (
//           <LobbyCard
//             playerInfo={localPlayer}
//             twilioUserInfo={room?.localParticipant}
//           />
//         )}
//         {/* {players &&
//           players
//             .filter((player) => player?.id === userId)
//             .map((localPlayer) => (
//               <Box p={3} width={1 / 4} color="white" bg="primary">
//                 <StyledCard
//                   width={256}
//                   sx={{
//                     borderRadius: 8,
//                     boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
//                   }}
//                 >
//                   {!room?.localParticipant && (
//                     <StyledAvatar
//                       src={`https://robohash.org/${
//                         localPlayer?.username
//                       }/size=100x100?set=set${getRandomInt(4)}`}
//                       sx={{
//                         width: 100,
//                         height: 100,
//                         borderRadius: 9999,
//                       }}
//                     />
//                   )}

//                   {room?.localParticipant?.identity === userId && (
//                     <Participant
//                       key={room.localParticipant.sid}
//                       participant={room.localParticipant}
//                     />
//                   )}
//                   <StyledHeading>{localPlayer?.username}</StyledHeading>
//                   {localPlayer?.ready ? (
//                     <StyledBox
//                       sx={{
//                         maxWidth: 512,
//                         mx: "auto",
//                         px: 3,
//                       }}
//                     >
//                       <StyledCheckIcon />
//                     </StyledBox>
//                   ) : (
//                     <StyledBox
//                       sx={{
//                         maxWidth: 512,
//                         mx: "auto",
//                         px: 3,
//                       }}
//                     >
//                       <StyledCloseIcon />
//                     </StyledBox>
//                   )}
//                   <StyledBadge sx={{ mx: "auto" }}>
//                     {localPlayer?.ready
//                       ? `${localPlayer?.username} ready!`
//                       : `${localPlayer?.username} not ready!`}
//                   </StyledBadge>
//                 </StyledCard>
//                 {localPlayer?.id === userId && (
//                   <StyledButtonContainer>
//                     {!localPlayer?.ready && (
//                       <StyledButton onClick={handleReadyClick}>
//                         Ready Up!
//                       </StyledButton>
//                     )}
//                   </StyledButtonContainer>
//                 )}
//                 ))
//               </Box>
//             ))} */}

//         {/* {players?.length &&
//           players
//             .filter((player) => player?.id !== userId)
//             .map((Player) => (
//               <Box p={3} width={1 / 4} color="white" bg="primary">
//                 <StyledCard
//                   width={256}
//                   sx={{
//                     borderRadius: 8,
//                     boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
//                   }}
//                 >
//                   {!participants && (
//                     <StyledAvatar
//                       src={`https://robohash.org/${
//                         Player.username
//                       }/size=100x100?set=set${getRandomInt(4)}`}
//                       sx={{
//                         width: 100,
//                         height: 100,
//                         borderRadius: 9999,
//                       }}
//                     />
//                   )}

//                   {participants
//                     .filter(
//                       (participant) => participant?.identity === Player?.id
//                     )
//                     .map((player) => (
//                       <Participant key={player?.sid} participant={player} />
//                     ))}
//                   <StyledHeading>{Player?.username}</StyledHeading>
//                   {Player?.ready ? (
//                     <StyledBox
//                       sx={{
//                         maxWidth: 512,
//                         mx: "auto",
//                         px: 3,
//                       }}
//                     >
//                       <StyledCheckIcon />
//                     </StyledBox>
//                   ) : (
//                     <StyledBox
//                       sx={{
//                         maxWidth: 512,
//                         mx: "auto",
//                         px: 3,
//                       }}
//                     >
//                       <StyledCloseIcon />
//                     </StyledBox>
//                   )}
//                   <StyledBadge sx={{ mx: "auto" }}>
//                     {Player?.ready
//                       ? `${Player?.username} ready!`
//                       : `${Player?.username} not ready!`}
//                   </StyledBadge>
//                 </StyledCard>
//                 {Player?.id === userId && (
//                   <StyledButtonContainer>
//                     {!Player?.ready && (
//                       <StyledButton onClick={handleReadyClick}>
//                         Ready Up!
//                       </StyledButton>
//                     )}
//                   </StyledButtonContainer>
//                 )}
//               </Box>
//             ))} */}
//       </StyledFlex>
//     </div>
//   );
// };

// export default Lobby;
