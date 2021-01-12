import { Card, Image, Flex, Box, Button } from "rebass";
import styled from "@emotion/styled";

export const GameContainer = styled.div`
  padding-top: 10%;
`;
export const PlayerCard = styled(Box)`
  background-color: red;
  height: 700px;
  border-radius: 10px;
  border: 2px solid white;
`;
export const HotseatCard = styled(Box)`
  background-color: orange;
  border-radius: 10px;
  height: 700px;
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
  display: flex;
  border-radius: 10px;
  height: 55%;
  border: 2px solid black;
  padding: 2px;
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

/* FOR PLAYING CARD STYLING */
export const GamePlayingCardContainer = styled.h3`
  background: white;
  font-family: "Open Sans", sans-serif;
  font-size: 1.25em;
  display: block;
  overflow: hidden;
  width: 300px;
  border-radius: 10px;
  border: 8px solid
    ${(props) => {
      if (props.type === "Truth") return "#3297f0";
      return "#F04931";
    }};
  text-align: left;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  max-height: 300px;
  padding: 30px 20px;
  margin: 20px;
  border-radius: 25px;
`;

export const GamePlayingCardText = styled.h2`
  font-family: "Open Sans", sans-serif;
  font-weight: ${(props) => {
    if (props.bold) return props.bold;
    return "regular";
  }};
  font-size: ${(props) => {
    if (props.size) return props.size;
    return "1em";
  }};
  color: ${(props) => {
    if (props.type === "Truth") return "#3297f0";
    else if (props.type == "Dare") return "#F04931";
    return "#111111";
  }};
  justify-content: center;
  align-items: center;
  padding-top: 20px;
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
