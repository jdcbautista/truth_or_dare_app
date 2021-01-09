import React, { useState, useCallback, useEffect } from "react";
import Room from "./screens/Room";
import { getTwilioToken } from "./services/twilio";
import * as FirestoreService from "./firebase";
import { Card, Image, Heading, Flex, Box, Button } from "rebass";
import styled from "@emotion/styled";
import { Label, Input, Select, Textarea, Radio, Checkbox } from "@rebass/forms";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import Video from "twilio-video";
import Participant from "./screens/Participant";

const StyledCard = styled(Card)`
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  padding: 16px;
  height: 320px;
  text-align: center;
  background-color: #525252;
`;

const StyledAvatar = styled(Image)`
  background-color: #313131;
`;

const StyledHeading = styled(Heading)`
  font-family: sans-serif;
`;

const StyledBox = styled(Box)`
  position: relative;
  top: 110px;
`;

const StyledButtonContainer = styled(Box)`
  margin: 0 auto;
  margin-top: 50px;
`;

const StyledButton = styled(Button)`
  position: relative;
  top: 30px;
  background-color: #525252;
  color: #ffffff;
`;

const StyledBadge = styled(Box)`
  background-color: #313131;
  border-radius: 2px;
  position: relative;
  top: 105px;
  font-size: 10px;
`;

const StyledCheckIcon = styled(AiFillCheckCircle)`
  color: #96bb7c;
  width: 50px;
`;

const StyledCloseIcon = styled(AiFillCloseCircle)`
  color: #ec625f;
  width: 50px;
`;
const Lobby = () => {
  //What the current screen is that is displayed
  const [screenID, setScreenID] = useState("title");
  // The twilio state for token, room, and participants in the room
  const [token, setToken] = useState(null);
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  //Error handling
  const [error, setError] = useState(null);
  // Keep track of players and current player
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [userId, setUserId] = useState(null);

  console.log({ room, token, participants });

  useEffect(() => {
    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
      })
      .catch((error) => console.log(error));

    const unsubscribe = FirestoreService.getPlayers("game1")
      .then((response) =>
        response.onSnapshot((gotPlayers) => {
          const players = gotPlayers.docs.map((player) => player.data());
          setPlayers(players);
        })
      )
      .catch((error) => console.log(error));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      getTwilioToken({ identity: userId, room: "game1" })
        .then((token) => setToken(token))
        .catch((error) => setError(error));
    }
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    if (token) {
      console.log(token);
      Video.connect(token, {
        name: "game1",
      }).then((room) => {
        console.log({ room });
        setRoom(room);
        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        room.participants.forEach(participantConnected);
      });
    }

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [userId, token]);

  console.log({ room: room?.localParticipant?.identity, userId: userId });
  if (loading) {
    return <h1>Loading...</h1>;
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const checkIfReady = () => {
    let readyStatus = false;
    if (players) {
      for (let player of players) {
        if (player.ready) {
          readyStatus = true;
        } else {
          readyStatus = false;
          break;
        }
      }
    }
    return readyStatus;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    setInputDisabled(true);
    FirestoreService.addPlayer({ username, userId }, "game1").catch((error) =>
      console.log(error)
    );
  };

  const handleReadyClick = (e) => {
    e.preventDefault();
    FirestoreService.readyPlayer(userId, "game1").catch((error) =>
      console.log(error)
    );
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  console.log(username);
  return (
    <div className="App">
      <h1>Lobby</h1>

      {!inputDisabled && (
        <Box as="form" onSubmit={handleSubmit} py={3}>
          <Flex mx={-2} mb={3}>
            <Box width={1} px={2}>
              <Label htmlFor="name">Enter your name</Label>
              <Input
                id="name"
                name="name"
                onChange={handleChange}
                defaultValue="Jane Doe"
              />
            </Box>
          </Flex>
        </Box>
      )}

      {checkIfReady() && (
        <>
          <button onClick={() => console.log("starting game")}>
            Start Game
          </button>
        </>
      )}
      <Flex>
        {players?.length &&
          players.map((Player) => (
            <div key={Player.id}>
              <Box p={3} width={1 / 4} color="white" bg="primary">
                <StyledCard
                  width={256}
                  sx={{
                    borderRadius: 8,
                    boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
                  }}
                >
                  {!room?.localParticipant ? (
                    <StyledAvatar
                      src={`https://robohash.org/${
                        Player.username
                      }/size=100x100?set=set${getRandomInt(4)}`}
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: 9999,
                      }}
                    />
                  ) : (
                    room?.localParticipant?.identity && (
                      <Participant
                        key={room.localParticipant.sid}
                        participant={room.localParticipant}
                      />
                    )
                  )}
                  <StyledHeading>{Player?.username}</StyledHeading>
                  {Player?.ready ? (
                    <StyledBox
                      sx={{
                        maxWidth: 512,
                        mx: "auto",
                        px: 3,
                      }}
                    >
                      <StyledCheckIcon />
                    </StyledBox>
                  ) : (
                    <StyledBox
                      sx={{
                        maxWidth: 512,
                        mx: "auto",
                        px: 3,
                      }}
                    >
                      <StyledCloseIcon />
                    </StyledBox>
                  )}
                  <StyledBadge sx={{ mx: "auto" }}>
                    {Player?.ready
                      ? `${Player?.username} ready!`
                      : `${Player?.username} not ready!`}
                  </StyledBadge>
                </StyledCard>
                {Player?.id === userId && (
                  <StyledButtonContainer>
                    {!Player?.ready && (
                      <StyledButton onClick={handleReadyClick}>
                        Ready Up!
                      </StyledButton>
                    )}
                  </StyledButtonContainer>
                )}
              </Box>
            </div>
          ))}
      </Flex>
    </div>
  );
};

export default Lobby;
