import { Card, Image, Flex, Box, Button } from "rebass";
import styled from "@emotion/styled/macro";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineAudio,
  AiOutlineAudioMuted,
} from "react-icons/ai";
import { FiVideoOff, FiVideo } from "react-icons/fi";

export const LandingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  height: 100vh;
`;

export const StyledSubmitButton = styled.button`
  width: 200px;
  height: 50px;
  padding: 10px;
  background-color: white;
  margin: 20px;
  border-radius: 10px;
  border: 3px solid #aaaaaa50;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const LandingHeader = styled.h1`
  font-family: "Open Sans", sans-serif;
  font-size: 5rem;
  font-weight: lighter;
  background: linear-gradient(to right, #23b5d3 35%, #858585 40%, #fe5148 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
