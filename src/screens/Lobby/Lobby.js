import React, { useState, useCallback, useEffect } from "react";
import { getTwilioToken } from "../../services/twilio";
import * as FirestoreService from "../../firebase";
import Video from "twilio-video";
import LobbyCard from "./LobbyCard";
import { checkIfReady } from "../../helpers";
import { Label, Input, Select, Textarea, Radio, Checkbox } from "@rebass/forms";
import { StyledFlex } from "./LobbyStyles";
import { Box, Flex } from "rebass";
const Lobby = () => {
  // The twilio state for token, room, and participants in the room
  const [token, setToken] = useState(null);
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  //Error and loading handles
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // Keep track of players and current player
  const [localPlayer, setLocalPlayer] = useState({});
  const [players, setPlayers] = useState([]);
  const [username, setUsername] = useState(null);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [userId, setUserId] = useState(null);

  console.log({ room, token, participants });
  console.log({ players, localPlayer, userId });

  // This effect runs on page load and uses firebase auth
  // to annonymously authenticate a user. It provides a unique
  // id that is associated with the users machine and stores in into
  // state. It also gets all of our players from a game (default is "game1")
  // and sets the local state with those players
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

  // This effect runs when there is both a token and a userId.
  // It fetches a JWT token from our django back end using twilio
  // API and then adds the local player as a participant in that room.
  // It finally updates the room state to acknowledge all players.
  useEffect(() => {
    if (userId) {
      getTwilioToken({ identity: userId, room: "game1" })
        .then((token) => {
          setToken(token);
        })
        .catch((error) => setError(error));
      console.log({ players, userId });
    }

    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
      // setPlayers((prevPlayers) =>
      //   prevPlayers.filter((p) => p?.id !== participant?.identity)
      // );
    };

    if (token) {
      Video.connect(token, {
        name: "game1",
      }).then((room) => {
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

  // This effect runs when there is both an authenticated user
  // and players and compares ids to find and set local player
  useEffect(() => {
    if (userId && players) {
      setLocalPlayer(players.filter((player) => player?.id === userId)[0]);
    }
  }, [players, userId]);

  const getTwilioInfo = (playerId, participants) => {
    console.log({ playerId, participants });
    const participant = participants.filter((participant) => participant);
    console.log({ participant });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

  // extract to a helpers function

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

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
      <StyledFlex>
        {localPlayer && room?.localParticipant && (
          <LobbyCard
            playerInfo={localPlayer}
            twilioUserInfo={room?.localParticipant}
            userId={userId}
          />
        )}

        {players &&
          participants &&
          userId &&
          players
            .filter((player) => player?.id !== userId)
            .map((player, i) => (
              <LobbyCard
                playerInfo={player}
                // twilioUserInfo={getTwilioInfo(player?.id, participants[i])}
                twilioUserInfo={participants[i]}
                userId={userId}
              />
            ))}
      </StyledFlex>
    </div>
  );
};

export default Lobby;
