import { Card, Image, Flex, Box, Button } from "rebass";
import styled from "@emotion/styled";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineAudio,
  AiOutlineAudioMuted,
} from "react-icons/ai";
import { FiVideoOff, FiVideo } from "react-icons/fi";

/* STYLES FOR VIDEO CONTAINER */

export const StyledGameVideoBox = styled(Box)`
  display: ${(props) => {
    if (props.displayoff) return "none";
    return "block";
  }};
  border: 10px solid red;
`;

export const StyledGameVideo = styled.video`
  width: 100%;
  height: 100%;
  border: 10px solid red;
  border-radius: 10px;
  object-fit: cover;
  display: inline-block;
  vertical-align: middle;
`;

export const StyledVideoBox = styled(Box)`
  height: ${(props) => {
    if (props.videoHeight) return props.videoHeight + "px";
    return "320px";
  }};
  overflow: hidden;
  border: ${(props) => {
    if (props.hotseat && props.gamePhase !== "setup")
      return "10px solid #FFF689";
    if (props.ready && props.gamePhase === "setup") return "10px solid #52AA5E";
    if (!props.ready && props.gamePhase === "setup")
      return "10px solid #FB5156";
    return "none";
  }};
  padding-right: 100px;
  object-position: left bottom;
  border-radius: 5px;
  display: ${(props) => {
    if (props.displayoff) return "none";
    return "block";
  }};
`;
export const StyledVideo = styled.video`
  height: ${(props) => {
    if (props.videoHeight) return props.videoHeight + "px";
    return "320px";
  }};
  margin: 0 auto;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg);
  object-position: 90px;
  display: ${(props) => {
    if (props.nodisplay) return "none";
    return "block";
  }};
`;

/* STYLES FOR INPUT */
export const FormGroup = styled.div`
  color: palevioletred;
  display: block;
  width: 300px;
  margin: 50px auto;
`;

export const StyledLabel = styled.label`
  margin-bottom: 0.5em;
  color: palevioletred;
  display: block;
`;

export const StyledInput = styled.input`
  padding: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

export const Message = styled.label`
  margin-bottom: 0.5em;
  color: palevioletred;
  display: block;
`;

/* STYLE FOR DEBUG BUTTON */
export const DebugButton = styled(Button)`
  opacity: 0.5;
  color: white;
  margin: 10px;
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
  height: 320px;
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
  border: ${(props) => {
    if (props.hotseat && props.gamePhase !== "setup")
      return "10px solid #FFF689";
    if (props.ready && props.gamePhase === "setup") return "10px solid #52AA5E";
    if (!props.ready && props.gamePhase === "setup")
      return "10px solid #FB5156";
    return "none";
  }};
  background-position: center;
  background-color: #fff;
  height: 320px;
  width: 100%;
  background-size: 100px;
`;
export const StyledHeading = styled.div`
  font-family: sans-serif;
  position: absolute;
  top: 3px;
  left: 3px;
  background-color: #00000050;
  padding: 3px;
  border-radius: 5px;
  display: flex;
  font-size: 12px;
  justify-content: center;
  align-self: center;
`;

export const StyledScoreContainer = styled.div`
  font-family: sans-serif;
  position: absolute;
  top: 3px;
  right: 3px;
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
  bottom: 15px;
  align-self: center;
  align-items: center;
  width: 30px;
  height: 30px;
  left: 12px;
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
  bottom: 15px;
  align-self: center;
  align-items: center;
  width: 30px;
  height: 30px;
  left: 45px;
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
