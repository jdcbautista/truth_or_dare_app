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
          <Lobby userId={userId} />
        </ModalProvider>
      )}
    </ThemeProvider>
  );
}

export default App;
