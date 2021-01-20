import React from "react";
import {
  LandingContainer,
  LandingHeader,
  InputContainer,
} from "./LandingStyles";
import LobbyInput from "../Lobby/components/LobbyInput";

function LandingPage({ handleSubmit, handleChange }) {
  return (
    <LandingContainer>
      <LandingHeader>truth or dare</LandingHeader>
      <InputContainer>
        <LobbyInput handleChange={handleChange} handleSubmit={handleSubmit} />
      </InputContainer>
    </LandingContainer>
  );
}

export default LandingPage;
