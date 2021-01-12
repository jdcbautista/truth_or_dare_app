import { Card, Image, Flex, Box, Button } from "rebass";
import styled from "@emotion/styled";

export const GameContainer = styled.div`
  padding-top: 10%;
`;
export const PlayerCard = styled(Box)`
  background-color: red;
  height: 600px;
  border-radius: 10px;
  border: 2px solid white;
`;
export const HotseatCard = styled(Box)`
  background-color: orange;
  border-radius: 10px;
  height: 600px;
  border: 2px solid white;
`;

export const GameVideoBox = styled(Box)`
  margin: 20px;
`;

export const GameCardBox = styled(Box)`
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 80%auto;
  border-radius: 10px;
  height: 55%;
  border: 2px solid black;
  padding: 30px;
  margin: 20px;
`;

export const GameHotseatVideoBox = styled(Box)`
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 80%auto;
  border-radius: 10px;
  height: 90%;
  border: 2px solid black;
  padding: 30px;
  margin: 20px;
`;

/* FOR PAGE TRANSITION ANIMATIONS */
export const PageTransitionRed = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: red;
`;
export const PageTransitionBlack = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: #000;
`;
export const PageWhite = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: red;
`;

export const PageRules = styled.div`
  text-transform: uppercase;
  font-family: sans-serif;
  font-size: 60px;
  position: absolute;
  z-index: 1;
  color: #fff;
  font-weight: bold;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
`;
