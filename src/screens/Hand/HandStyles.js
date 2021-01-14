import { Card, Image, Flex, Box, Button } from "rebass";

import styled, { keyframes, css } from "styled-components";
import { fadeIn, bounce } from "react-animations";

export const rotate = keyframes`
100% {
		transform: rotate(1turn);
	}
  `;

export const HandContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  bottom: -500;
  position: absolute;
`;
export const PlayerCard = styled.div`
  /* background-color: red; */
  border-radius: 50px;
  /* box-shadow: 0 0 16px rgba(0, 0, 0, 0.25); */
  margin: 5px;
`;
export const HotseatCard = styled(Box)`
  /* background-color: orange; */
  border-radius: 10px;
  height: 700px;
  border: 2px solid white;
`;

export const HandVideoBox = styled(Box)`
  margin: 20px;
`;

export const HandCardBox = styled(Box)`
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 80%auto;
  display: flex;
  border-radius: 10px;
  height: 55%;
  padding: 2px;
  margin: 20px;
`;

export const HandHotseatVideoBox = styled(Box)`
  text-align: center;
  justify-content: center;
  align-items: center;
  width: 80%auto;
  justify-content: center;
  align-self: center;
  border-radius: 10px;
  height: 90%;
  /* border: 2px solid black; */
  padding: 30px;
  margin: 20px;
`;

export const StandardPlayingCardContainer = styled(Card)`
  background: white;
  font-family: "Open Sans", sans-serif;
  font-size: 1.25em;
  display: block;
  overflow: hidden;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 8px solid
    ${(props) => {
      if (props.type === "Truth") return "#64c0fa";
      return "#FB5156";
    }};
  text-align: left;
  justify-content: center;
  align-items: center;
  height: 320px;
  width: 256px;
  padding: 30px 20px;
  border-radius: 25px;
`;

/* FOR PLAYING CARD STYLING */
export const WildPlayingCardContainer = styled(Card)`
  position: relative;
  z-index: 0;
  height: 320px;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.25);
  width: 256px;
  padding: 30px 20px;
  border-radius: 25px;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    z-index: -2;
    left: -50%;
    top: -50%;
    width: 200%;
    height: 200%;
    background-color: #399953;
    background-repeat: no-repeat;
    background-size: 50% 50%, 50% 50%;
    background-position: 0 0, 100% 0, 100% 100%, 0 100%;
    background-image: linear-gradient(#399953, #399953),
      linear-gradient(#fbb300, #fbb300), linear-gradient(#d53e33, #d53e33),
      linear-gradient(#377af5, #377af5);
    animation: ${rotate} 6s linear infinite;
  }

  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 8px;
    top: 8px;
    width: calc(100% - 15px);
    height: calc(100% - 16px);
    background: white;
    border-radius: 20px;
  }
`;

export const HandPlayingCardText = styled.h2`
  font-family: "Open Sans", sans-serif;
  font-weight: ${(props) => {
    if (props.bold) return props.bold;
    return "regular";
  }};
  font-size: ${(props) => {
    if (props.size) return props.size;
    return "em";
  }};
  color: ${(props) => {
    if (props.type === "Truth") return "#64c0fa";
    else if (props.type == "Dare") return "#FB5156";
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
