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
import Navbar from "./components/Navbar";

const Lobby = ({ userId, localPlayer, players, loading }) => {
  // The twilio state for token, room, and participants in the room
  const [token, setToken] = useState(null);
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);
  //Error and loading handles
  const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(false);
  // const [players, setPlayers] = useState([]);
  // Keep track of players and current player
  const [readyClicked, setReadyClicked] = useState(false)
  
  
  const [username, setUsername] = useState(null);
  // For game states
  const [isHandOpen, setIsHandOpen] = useState(null);
  const [gamePhase, setGamePhase] = useState({ phase: "setup" });
  const [gameRound, setGameRound] = useState(1);
  // Start the game when all players are ready and start button is clicked
  const [isGameStarted, setIsGameStarted] = useState(false);
  // This effect runs on page load and uses firebase auth
  // to annonymously authenticate a user. It provides a unique
  // id that is associated with the users machine and stores in into
  // state. It also gets all of our players from a game
  // and sets the local state with those players
  // useEffect(() => {
  //   const unsubscribe = FirestoreService.getPlayers(FirestoreService.GAMEROOM)
  //     .then((response) =>
  //       response.onSnapshot((gotPlayers) => {
  //         const players = gotPlayers.docs.map((player) => player.data());
  //         setPlayers(players);
  //         setLoading(false);
  //       })
  //     )
  //     .catch((error) => console.log(error));
  //   return () => unsubscribe();
  // }, []);
  // This effect runs when there is both a token and a userId.
  // It fetches a JWT token from our django back end using twilio
  // API and then adds the local player as a participant in that room.
  // It finally updates the room state to acknowledge all players.
  useEffect(() => {
    if (userId) {
      getTwilioToken({ identity: userId, room: FirestoreService.GAMEROOM })
        .then((token) => {
          setToken(token);
        })
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
      Video.connect(token, {
        name: FirestoreService.GAMEROOM,
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

  // This effect subscribes to the game phase and passes it to all the components
  // of the lobby, game, and nav that need access to it
  useEffect(() => {
    const unsubscribe = FirestoreService.getGamePhase(FirestoreService.GAMEROOM)
      .then((response) =>
        response.onSnapshot((gotGamePhase) => {
          const gamePhase = gotGamePhase.docs.map((doc) => doc.data())[0];
          setGamePhase(gamePhase);
          setGameRound(gamePhase?.round);
        })
      )
      .catch((error) => console.log(error));
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    if (isHandOpen == false) {
      gsap
        .timeline()

      .fromTo(
        ".gameContainerFadeIn",
        { filter: "blur(10px)", opacity: 1 },
        { filter: "blur(0px)", opacity: 1, duration: 1 }
      )
      //
    }
  }, []);

  const handleReadyClick = (e) => {
    e.preventDefault();
    FirestoreService.readyPlayer(
      userId,
      FirestoreService.GAMEROOM
    ).catch((error) => setError(error));
    setReadyClicked(!readyClicked)
    console.log(readyClicked)
  };

  const createPlaceholders = (numberOfPlayersInGame) => {
    return Array.from(
      Array(4 - numberOfPlayersInGame.length)
    ).map((element) => <LobbyCard defaultCard />);
  };

  const handleViewHand = () => {
    setIsHandOpen(!isHandOpen);
    gsap
      .timeline()

      .fromTo(
        ".gameContainerFadeIn",
        { filter: "blur(0px)" },
        { filter: "blur(10px)", duration: 1 }
      )
      .fromTo(
        ".handContainerFadeIn",
        { opacity: 0, filter: "blur(40px)", transform: "translateY(-400px)" },

        {
          opacity: 1,
          filter: "blur(0px)",
          transform: "translateY(0px)",
          duration: 0.8,
        }
      );
  };

  const handleStartGame = async () => {
    await FirestoreService.startGame(FirestoreService.GAMEROOM).catch((err) =>
      console.log(err)
    );
    setIsGameStarted(true);
  };

  const handleLoadDeck = async (e) => {
    e.preventDefault();
    await FirestoreService.loadDeckFromResources().catch((err) =>
      console.log(err)
    );
  };

  const handleDeleteField = async (e) => {
    await FirestoreService.deleteField(FirestoreService.GAMEROOM).catch((err) =>
      console.log(err)
    );
  };

  const handleAddPoints = async (e) => {
    await FirestoreService.addPointsToPlayer(
      FirestoreService.GAMEROOM
    ).catch((err) => console.log(err));
  };

  const handleAdvanceHotseat = async () => {
    FirestoreService.setHotseatPlayer(FirestoreService.GAMEROOM).catch((err) =>
      setError(err)
    );
  };

  const handleEndVoting = async () => {
    await FirestoreService.endVoting(FirestoreService.GAMEROOM).catch((err) =>
      setError(err)
    );
    await gsap.timeline().fromTo(
      ".gameContainerFadeIn",
      { opacity: 1, filter: "blur(0px)" },

      {
        opacity: 0,
        filter: "blur(20px)",
        duration: 3,
      }
    );
  };

  const handleCleanupStart = async () => {
    await FirestoreService.cleanupStart(
      FirestoreService.GAMEROOM
    ).catch((err) => setError(err));
  };
  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Navbar
            showHand={handleViewHand}
            gameRound={gameRound}
            startGame={handleStartGame}
            loadDeck={handleLoadDeck}
            deleteField={handleDeleteField}
            // completeTask={handleTaskComplete}
            advanceHotseat={handleAdvanceHotseat}
            addPoints={handleAddPoints}
            endVotingTimer={handleEndVoting}
            endFadeTimer={handleCleanupStart}
          />

          <LobbyContainer
            onClick={() => (isHandOpen ? handleViewHand() : "")}
            className="LobbyToNav"
          >
            <StyledFlex className="fadeOutVideo">
              {localPlayer && room?.localParticipant && (
                <Suspense fallback={<div>Loading...</div>}>
                  <LobbyCard
                    gamePhase={gamePhase}
                    twilioUserInfo={room?.localParticipant}
                    userId={userId}
                    user={localPlayer}
                    handleReadyClick={(e) => handleReadyClick(e)}
                  />
                </Suspense>
              )}
              {/* {createPlaceholders(players)} */}

              {participants &&
                room &&
                players &&
                players
                  .filter((player) => player?.id !== userId)
                  .map((player) => (
                    <Suspense fallback={<div>Loading...</div>}>
                      <LobbyCard
                        playerInfo={player}
                        gamePhase={gamePhase}
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
              gamePhase={gamePhase.phase}
              approved={gamePhase.approved}
              votePhaseEnd={gamePhase.votePhaseEnd}
              hotseat={gamePhase.hotseatName}
              cardPoints={gamePhase.cardPoints}
              user={localPlayer}
              className="gameGSAP"
              localPlayer={localPlayer}
              localParticipant={room?.localParticipant}
              mockHand="I dare you"
              token={token}
              handleReadyClick={handleReadyClick}
              endVoting={handleEndVoting}
              handleStartGame={handleStartGame}
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

            

            {!isHandOpen && !localPlayer?.hotseat && gamePhase.phase !== 'gameOver' && (
              <DebugButton onClick={handleViewHand}>Show Hand</DebugButton>
            )}
            {localPlayer?.hotseat && gamePhase.phase === 'voting' && (
              <DebugButton onClick={handleEndVoting}>Skip Voting Phase</DebugButton>
            )}
          </LobbyContainer>
        </>
      )}
    </>
  );
};

export default Lobby;
