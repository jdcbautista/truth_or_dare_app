import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import theme from "@rebass/preset";
import Game from "./Game.js";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Game />
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
