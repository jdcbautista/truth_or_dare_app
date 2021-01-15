import "./App.css";
import { ThemeProvider } from "@emotion/react";
import Lobby from "./screens/Lobby/Lobby";
import { ModalProvider } from "styled-react-modal";

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
  return (
    <ThemeProvider theme={{ theme: theme }}>
      <ModalProvider>
        <Lobby />
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;
