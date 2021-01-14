import { gsap } from "gsap";
import React, { useState, useEffect, Suspense } from "react";
import { getTwilioToken } from "../../services/twilio";
import * as FirestoreService from "../../firebase";
import Video from "twilio-video";
import LobbyCard from "./components/LobbyCard";
import Game from "../Game/Game";
import Hand from "../Hand/Hand";
import LobbyInput from "./components/LobbyInput";
import { checkIfReady } from "../../helpers";
import { LobbyContainer } from "./LobbyStyles";
import { StyledFlex, DebugButton } from "./LobbyStyles";
import { Card, Image, Heading, Flex, Box, Button } from "rebass";
import styled from "@emotion/styled";
import { Label, Input, Select, Textarea, Radio, Checkbox } from "@rebass/forms";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const Lobby = () => {
  // Jarrett & Emma
  //What the current screen is that is displayed
  const [screenID, setScreenID] = useState("title");
  //The identity and room name of the current user
  const [identity, setIdentity] = useState("");
  const [roomName, setRoomName] = useState("");
  //
  const [ready, setReady] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  // Michael
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
  // For game states
  const [isHandOpen, setIsHandOpen] = useState(null);
  // Auth
  const [userId, setUserId] = useState(null);
  // Start the game when all players are ready and start button is clicked
  const [isGameStarted, setIsGameStarted] = useState(false);

  // This effect runs on page load and uses firebase auth
  // to annonymously authenticate a user. It provides a unique
  // id that is associated with the users machine and stores in into
  // state. It also gets all of our players from a game (default is "game1")
  // and sets the local state with those players
  useEffect(() => {
    console.log("AUTH ANON RAN");
    setLoading(true);
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
          setLoading(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    FirestoreService.addPlayer({ username, userId }, "game1").catch((error) =>
      setError(error)
    );
  };

  const handleReadyClick = (e) => {
    e.preventDefault();
    FirestoreService.readyPlayer(userId, "game1").catch((error) =>
      setError(error)
    );
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const createPlaceholders = (numberOfPlayersInGame) => {
    return Array.from(
      Array(4 - numberOfPlayersInGame.length)
    ).map((element) => <LobbyCard defaultCard />);
  };

  const handleViewHand = () => {
    setIsHandOpen(!isHandOpen);
  };

  const handleStartGame = () => {
    setIsGameStarted(true);

    gsap
      .timeline()

      .fromTo(
        ".gameContainerFadeIn",
        { filter: "blur(0px)" },
        { filter: "blur(10px)", duration: 2 }
      )
      .fromTo(
        ".handContainerFadeIn",
        { opacity: 0, filter: "blur(40px)", transform: "translateY(400px)" },

        {
          opacity: 1,
          filter: "blur(0px)",
          transform: "translateY(0px)",
          duration: 0.8,
        }
      );
  };
  const handleLoadDeck = async (e) => {
    e.preventDefault();
    await FirestoreService.loadDeckFromResources();
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {checkIfReady(players) && (
            <div>
              <button onClick={handleStartGame}>Start Game</button>
              <button onclick={(e) => handleLoadDeck()}>Load</button>
            </div>
          )}

          <DebugButton onClick={handleStartGame}>
            Force Start (not a production button!)
          </DebugButton>
          <DebugButton onClick={handleViewHand}>
            {isHandOpen ? "Close Hand" : "Open Hand"}
          </DebugButton>
          <DebugButton>Load (not a production button!)</DebugButton>

          <LobbyContainer className="LobbyToNav">
            {!localPlayer && (
              <LobbyInput
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            )}

            <StyledFlex className="fadeOutVideo">
              {localPlayer && room?.localParticipant && (
                <Suspense fallback={<div>Loading...</div>}>
                  <LobbyCard
                    playerInfo={localPlayer}
                    twilioUserInfo={room?.localParticipant}
                    userId={userId}
                    user={localPlayer}
                    handleReadyClick={(e) => handleReadyClick(e)}
                  />
                </Suspense>
              )}
              {createPlaceholders(players)}

              {participants &&
                room &&
                players &&
                players
                  .filter((player) => player?.id !== userId)
                  .map((player) => (
                    <Suspense fallback={<div>Loading...</div>}>
                      <LobbyCard
                        playerInfo={player}
                        twilioUserInfo={
                          participants.filter(
                            (participant) =>
                              participant?.identity === player?.id
                          )[0]
                        }
                        userId={userId}
                        user={player}
                        handleReadyClick={(e) => handleReadyClick(e)}
                      />
                    </Suspense>
                  ))}
            </StyledFlex>
            <Game
              room={room}
              players={players}
              participants={participants}
              userId={userId}
              user={localPlayer}
              className="gameGSAP"
              localPlayer={localPlayer}
              localParticipant={room?.localParticipant}
              mockHand="I dare you"
              token={token}
              handleReadyClick={handleReadyClick}
            />

            {isHandOpen && (
              <Hand
                room={room}
                players={players}
                participants={participants}
                userId={userId}
                user={localPlayer}
                className="gameGSAP"
                localPlayer={localPlayer}
                localParticipant={room?.localParticipant}
                mockHand="I dare you"
                token={token}
                handleReadyClick={handleReadyClick}
              />
            )}
          </LobbyContainer>
        </>
      )}
    </>
  );
};

export default Lobby;
