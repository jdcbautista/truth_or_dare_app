import "./App.css";
import { ThemeProvider } from "@emotion/react";
import Lobby from "./screens/Lobby/Lobby";
import { ModalProvider } from "styled-react-modal";
import { useEffect, useState } from "react";
import * as FirestoreService from "./firebase";
import LobbyInput from "./screens/Lobby/components/LobbyInput";
import LandingPage from "./screens/LandingPage/LandingPage";

const theme = {
  colors: {
    white: "#FFFFFF",
    black: "#000000",
    success: "#52AA5E",
    error: "#FB5156",
    truth: "#64C0FA",
    dare: "#FB5156",
    wild: "#58355E",
  },
};

function App() {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const [localPlayer, setLocalPlayer] = useState(null)
  const [players, setPlayers] = useState([]);

  // This effect runs on page load and uses firebase auth
  // to annonymously authenticate a user. It provides a unique
  // id that is associated with the users machine and stores in into
  // state. It also gets all of our players from a game
  // and sets the local state with those players
  useEffect(() => {
    const unsubscribe = FirestoreService.getPlayers(FirestoreService.GAMEROOM)
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

   // This effect runs when there is both an authenticated user
  // and players and compares ids to find and set local player
  useEffect(() => {
    if (userId && players) {
      setLocalPlayer(players.filter((player) => player?.id === userId)[0]);
    }
  }, [players, userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await FirestoreService.authenticateAnonymously();
    const userCredential = user?.user?.uid;
    setUserId(userCredential);
    await FirestoreService.addPlayer(
      { username, userId: userCredential },
      FirestoreService.GAMEROOM
    );
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  console.log({ username });
  return (
    <ThemeProvider theme={{ theme: theme }}>
      {!userId ? (
        <LandingPage
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        ></LandingPage>
      ) : (
        <ModalProvider>
          {players && localPlayer && userId && <Lobby userId={userId} players={players} localPlayer={localPlayer} loading={loading} />}
        </ModalProvider>
      )}
    </ThemeProvider>
  );
}

export default App;
