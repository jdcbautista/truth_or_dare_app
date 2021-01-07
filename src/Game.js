import React, { useState, useCallback, useEffect } from "react";
import ScreenSelect from "./screens/ScreenSelect.js";
import Lobby from "./screens/Lobby";
import Room from "./screens/Room";
import { getTwilioToken } from "./services/twilio";
import * as FirestoreService from "./firebase";

const Game = () => {
  //What the current screen is that is displayed
  const [screenID, setScreenID] = useState("title");
  //The identity and room name of the current user
  const [identity, setIdentity] = useState("");
  const [roomName, setRoomName] = useState("");
  // The twilio token for audio/video chat
  const [token, setToken] = useState(null);
  //Error handling
  const [error, setError] = useState(null);
  // Keep track of players and current player
  const [players, setPlayers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(undefined);
  const [ready, setReady] = useState(false);
  const [inputdisabled, setDisabled] = useState(false);

  const [userId, setUserId] = useState(null);

  const handleCallback = (value) => {
    setScreenID(value);
  };

  useEffect(() => {
    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
      })
      .catch((error) => console.log(error));
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
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
    //Disable the input
    setDisabled(true);
    //Add the player with their anon auth ID and username
    FirestoreService.addPlayer(username, userId);
    //Grt the JWT token for twilio audio/video
    getTwilioToken({ identity: username, room: "game" })
      .then((token) => setToken(token))
      .catch((error) => setError(error));
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <div className="App">
      <h1>Lobby</h1>
      <div className="inputBox">
        {!inputdisabled ? (
          <h3>Enter display name</h3>
        ) : (
          <>
            <h3>Welcome to Truth or Dare, {username}!</h3>
            {token && <Room roomName={"game"} token={token} />}
          </>
        )}
        {!inputdisabled && (
          <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={handleChange} />
            {/* <textarea value={desc} onChange={(e) => setDesc(e.target.value)} /> */}
            <button type="submit">Submit</button>
          </form>
        )}
      </div>
      {checkIfReady() && (
        <>
          <button onClick={() => console.log("starting game")}>
            Start Game
          </button>
          <p>everyone is ready</p>
        </>
      )}
      {/* {players?.length &&
        players.map((Player) => (
          <div key={Player.id}>
            <h2>{Player.username}</h2>
            {Player?.ready ? <p>ready</p> : <p>not ready</p>}
            <p>{Player.desc}</p>
            {Player?.username === username && (
              <div>
                <button onClick={() => deletePlayer(Player)}>Leave</button>
                <button
                  inputdisabled={Player?.ready}
                  onClick={() =>
                    editPlayer({
                      username,
                      ready: !Player.ready,
                      id: Player.id,
                    })
                  }
                >
                  Ready
                </button>
              </div>
            )}
          </div>
        ))} */}
    </div>
    // <div className="Game">
    //   {/* <ScreenSelect
    //     identity={identity}
    //     token={token}
    //     setToken={setToken}
    //     roomName={roomName}
    //     currentScreen={screenID}
    //     handleCallback={handleCallback}
    //   /> */}

    // </div>
  );
};

export default Game;
