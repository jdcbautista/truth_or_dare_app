import React, { useState, useCallback } from "react";
import ScreenSelect from "./screens/ScreenSelect.js";
import Lobby from "./screens/Lobby";
import Room from "./screens/Room";
import { getTwilioToken } from "./services/twilio";

const Game = () => {
  //What the current screen is that is displayed
  const [screenID, setScreenID] = useState("title");
  //The identity and room name of the current user
  const [identity, setIdentity] = useState("");
  const [roomName, setRoomName] = useState("");
  // The twilio token for audio/video chat
  const [token, setToken] = useState(null);

  const handleCallback = (value) => {
    setScreenID(value);
  };

  // Handles the form change for a user name (may not be required)
  const handleUsernameChange = useCallback((event) => {
    setIdentity(event.target.value);
  }, []);

  // Handles the form change for a room name (may not be required)
  const handleRoomNameChange = useCallback((event) => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await getTwilioToken({ identity, roomName }).then((response) => {
        console.log(response);
        setToken(response);
      });
    },
    [(identity, roomName)]
  );

  const handleLogout = useCallback((event) => {
    setToken(null);
  }, []);

  return (
    <div className="Game">
      <ScreenSelect
        identity={identity}
        token={token}
        setToken={setToken}
        roomName={roomName}
        currentScreen={screenID}
        handleCallback={handleCallback}
      />
    </div>
  );
};

export default Game;
