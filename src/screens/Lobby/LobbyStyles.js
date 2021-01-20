import { Card, Image, Flex, Box, Button } from "rebass";
import styled from "@emotion/styled/macro";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineAudio,
  AiOutlineAudioMuted,
} from "react-icons/ai";
import { FiVideoOff, FiVideo } from "react-icons/fi";

/* STYLES FOR VIDEO CONTAINER */

export const StyledVideoBox = styled(Box)`
  height: 250px;
  position: relative;
  display: flex;
  min-height: 256px;
  align-items: center;
  width: 250px;
  box-sizing: border-box;
  overflow: hidden;
  padding-right: 100px;
  object-position: left bottom;
  border-radius: 100%;
  display: ${(props) => {
    if (props.displayoff) return "none";
    return "block";
  }};
`;

export const StyledVideo = styled.video`
  height: 100%;
  width: 100%;
  border: ${(props) => {
    if (props.hotseat && props.gamePhase !== "setup")
      return "10px solid #FFF689";
    if (props.ready && props.gamePhase === "setup") return "10px solid #52AA5E";
    if (!props.ready && props.gamePhase === "setup")
      return "10px solid #FB5156";
    if (props.vote === "yes" && props.gamePhase === "voting")
      return "10px solid #64c0fa";
    if (props.vote === "no" && props.gamePhase === "voting")
      return "10px solid #FB5156";
    if (props.winner && props.gamePhase === "gameOver")
      return "20px solid #000000";
    return "10px solid #cccccc50";
  }};
  border-radius: 50%;
  position: absolute;
  margin: 0 auto;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg);
  object-fit: cover;
  display: ${(props) => {
    if (props.nodisplay) return "none";
    return "block";
  }};
  &:hover {
    opacity: 0.5;
  }
`;

export const StyledHeading = styled.div`
  font-family: sans-serif;
  position: absolute;
  top: 30px;
  right: 110px;
  background-color: #00000050;
  padding: 3px;
  border-radius: 5px;
  font-size: 15px;
  justify-content: center;
  align-self: center;
`;

/* STYLES FOR INPUT */
export const FormGroup = styled.div`
  color: palevioletred;
  display: block;

  margin: 50px auto;
`;

export const StyledLabel = styled.label`
  font-family: "Open Sans", sans-serif;
  margin-bottom: 0.5em;
  color: palevioletred;
  display: block;
`;

export const StyledButtonFlex = styled.div`
  display: flex;
  justify-content: center;
`;
export const StyledInput = styled.input`
  font-family: "Open Sans", sans-serif;
  background-color: #cccccc50;
  padding: 10px;
  border-radius: 3px;
  border: 0;
  outline: none;
  width: 600px;
  font-size: 1.5em;
  transition: padding 0.3s 0.2s ease;
  border-bottom: 2px solid #aaa;
  transition: 500ms all;

  &:focus {
    border-bottom: 2px solid red;
  }
`;

export const Message = styled.label`
  font-family: "Open Sans", sans-serif;
  margin-bottom: 0.5em;
  color: palevioletred;
  display: block;
`;

/* STYLE FOR DEBUG BUTTON */
export const DebugButton = styled.button`
  opacity: 0.5;
  color: white;
  margin: 10px;
  font-size: 10px;
  background-color: red;
  &:hover {
    opacity: 1;
  }
`;

/* STYLES FOR LOBBY */

export const LobbyContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: fixed;
`;

/* STYLES FOR LOBBY CARD */

export const StyledCard = styled(Card)`
  color: white;

  font-family: Arial, Helvetica, sans-serif;
  height: 100%;
  position: relative;
  margin: 0 auto;
  text-align: center;
`;

export const StyledFlex = styled(Flex)`
  justify-content: space-evenly;
`;
export const StyledAvatar = styled.img`
  display: ${(props) => {
    if (props.displayoff) return "none";
    return "block";
  }};
  min-height: 256px;
  border: ${(props) => {
    if (props.hotseat && props.gamePhase !== "setup")
      return "10px solid #FFF689";
    if (props.ready && props.gamePhase === "setup") return "10px solid #4BB543";
    if (!props.ready && props.gamePhase === "setup")
      return "10px solid #FB5156";
    return "10px solid #cccccc50";
  }};
  background-position: center;
  background-color: #fff;
  height: 100%;
  border-radius: 100%;
  width: 100%;
  background-size: 100px;
`;

export const StyledScoreContainer = styled.div`
  font-family: sans-serif;
  position: absolute;
  top: 0px;
  left: 3px;
  background-color: #00000050;
  padding: 3px;
  border-radius: 5px;
  display: flex;
  font-size: 12px;
  justify-content: center;
  align-self: center;
`;
export const StyledButtonContainer = styled(Box)`
  margin: 0 auto;
  position: relative;
  top: 10px;
`;
export const StyledButton = styled(Button)`
  position: relative;
  top: 30px;
  background-color: #525252;
  color: #ffffff;
`;

export const StyledReadyButton = styled(Button)`
  position: relative;
  top: 30px;
  background-color: #525252;
  color: #ffffff;
`;

export const StyledBadge = styled(Box)`
  background-color: #313131;
  border-radius: 2px;
  position: absolute;
  width: 100%;
  font-size: 10px;
  bottom: 0;
`;

export const StyledVideoIconButton = styled.div`
  background: #31313150;
  border-radius: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  position: absolute;
  bottom: -10px;
  align-self: center;
  align-items: center;
  width: 30px;
  height: 30px;
  left: 0px;
  &:hover {
    background-color: #313131;
    border-radius: 100%;
  }
`;

export const StyledAudioIconButton = styled.div`
  background: #31313150;
  border-radius: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  position: absolute;
  bottom: -10px;
  align-self: center;
  align-items: center;
  width: 30px;
  height: 30px;
  left: 35px;
  &:hover {
    background-color: #313131;
    border-radius: 100%;
  }
`;
export const StyledCheckIcon = styled(AiFillCheckCircle)`
  color: #96bb7c;
  width: 50px;
`;
export const StyledCloseIcon = styled(AiFillCloseCircle)`
  color: #ec625f;
  width: 50px;
`;
export const StyledVideoOnIcon = styled(FiVideo)`
  color: #ec625f;
  width: 50px;
`;
export const StyledVideoOffIcon = styled(FiVideoOff)`
  color: #ec625f;
  width: 50px;
`;
export const StyledAudioOnIcon = styled(AiOutlineAudio)`
  color: #ec625f;
  width: 50px;
`;
export const StyledAudioOffIcon = styled(AiOutlineAudioMuted)`
  color: #ec625f;
  width: 50px;
`;

/* STYLES FOR TITLE BAR & TEXT BAR */
