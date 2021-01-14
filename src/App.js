import "./App.css";
import { ThemeProvider } from "@emotion/react";
import Lobby from "./screens/Lobby/Lobby";

const theme = {
  colors: {
    success: '#52AA5E',
    error: '#FB5156',
    truth: '#64C0FA',
    dare: '#FB5156',
    wild: '#58355E',
  },
}

function App() {
  return (
  <ThemeProvider theme={theme}>
    <Lobby />
  </ThemeProvider>
  )
}

export default App;
