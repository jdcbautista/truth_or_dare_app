import React from "react";
import { Flex } from "rebass";
import { render } from "react-dom";
import {
  FormGroup,
  StyledLabel,
  StyledInput,
  StyledButtonFlex,
  Message,
} from "../LobbyStyles";
import { StyledSubmitButton } from "../../LandingPage/LandingStyles";

const message = "this is the validation message";
function LobbyInput({ handleChange, handleSubmit }) {
  return (
    <div>
      <FormGroup>
        <form onSubmit={handleSubmit}>
          <StyledLabel htmlFor="label">Enter your name</StyledLabel>
          <StyledInput onChange={handleChange} id="label" />
          <StyledButtonFlex>
            <StyledSubmitButton type="submit">ENTER ROOM</StyledSubmitButton>
          </StyledButtonFlex>
        </form>
      </FormGroup>
    </div>
  );
}

export default LobbyInput;
