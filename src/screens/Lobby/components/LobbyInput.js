import React from "react";
import { render } from "react-dom";
import { FormGroup, StyledLabel, StyledInput, Message } from "../LobbyStyles";

const message = "this is the validation message";
function LobbyInput({ handleChange, handleSubmit }) {
  return (
    <div>
      <FormGroup>
        <form onSubmit={handleSubmit}>
          <StyledLabel htmlFor="label">Label</StyledLabel>
          <StyledInput onChange={handleChange} id="label" />
          <Message>This is the validation message</Message>
        </form>
      </FormGroup>
    </div>
  );
}

export default LobbyInput;
