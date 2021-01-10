import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import theme from "@rebass/preset";
import Lobby from "./screens/Lobby/Lobby";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Lobby />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
