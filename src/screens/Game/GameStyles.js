import { Card, Image, Flex, Box, Button } from "rebass";
import styled, { keyframes, css } from "styled-components";
import { fadeIn, bounce } from "react-animations";

export const rotate = keyframes`
100% {
		transform: rotate(1turn);
	}
  `;

export const GameContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 100vw;
  height: 400px;
  border: 0px osolid black;
`;

export const TextContainer = styled.div`
  display: flex;
  color: #777777;
  font-size: 2em;
  font-family: "Open Sans", sans-serif;
  justify-content: center;
  width: 100vw;
  height: 80px;
  padding: 40px;
`;

export const TimerBar = styled.div`
  background-color: red;
`;

export const PlayerCard = styled.div`
  width: 100%;
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
  padding: 2px;
  margin: 20px;
`;

export const GameHotseatVideoBox = styled(Box)`
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

export const SelectCardStyles = css`
  content: " ";
  position: absolute;
  z-index: 0;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 20px;
  border: 5px solid #663399;
`;

export const StandardPlayingCardContainer = styled(Card)`
  position: relative;
  background: white;
  font-family: "Open Sans", sans-serif;
  font-size: 1.25em;
  position: relative;
  /* opacity: ${(props) => {
    if (!props.currentlySelectedCard && !props.selected) return "0.3";
    return "1";
  }}; */
  display: block;
  overflow: hidden;
  box-shadow: ${(props) => {
    if (props.selected) return "0 0 32px rgba(0, 0, 0, 0.50)";
    return "0 0 16px rgba(0, 0, 0, 0.25)";
  }};
  border-radius: 10px;
  border: 9px solid
    ${(props) => {
      if (props.type === "dare") return "#FB5156";
      else if (props.type === "truth") return "#64c0fa";
    }};
  text-align: left;
  justify-content: center;
  align-items: center;
  height: 320px;
  transition: 150ms all;
  width: 256px;
  padding: 30px 20px;
  border-radius: 25px;
  &:after {
    ${(props) => {
      if (props.selected) return SelectCardStyles;
    }};
  }
`;

/* FOR PLAYING CARD STYLING */
export const WildPlayingCardContainer = styled(Card)`
  position: relative;
  z-index: 0;
  height: 320px;
  /* opacity: ${(props) => {
    if (!props.currentlySelectedCard && !props.selected) return "0.3";
    return "1";
  }}; */
  box-shadow: ${(props) => {
    if (props.selected) return "0 0 32px rgba(0, 0, 0, 0.50)";
    return "0 0 16px rgba(0, 0, 0, 0.25)";
  }};
  width: 256px;
  border-radius: 10px;
  border: 8px solid black;
  color: white;
  border: 8px solid
    ${(props) => {
      if (props.selected) return "gold";
      return "#FB5156";
    }};
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
    animation: ${rotate} 15s linear infinite;
  }

  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    left: 8px;
    top: 8px;
    border-radius: 20px;
    ${(props) => {
      if (props.selected) return SelectCardStyles;
    }};
  }
`;

export const GamePlayingCardText = styled.h2`
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
    if (props.type === "truth") return "#64c0fa";
    else if (props.type == "dare") return "#FB5156";
    else if (props.type == "wild") return "#FFFFFF";
    return "#000000";
  }};
`;

export const VotingCardText = styled.h2`
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
    if (props.yesNoSelected === "yes") return "#64c0fa";
    else if (props.yesNoSelected == "no") return "#FB5156";
    else if (props.yesNoSelected == "selected") return "gold";
    return "#000000";
  }};
  display: block;
  text-align: left;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  padding: 30px 20px;
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

export const PlayedBy = styled.div`
  font-family: sans-serif;
  position: absolute;
  bottom: 13px;
  left: 13px;
  background-color: grey;
  z-index: 3;
  padding: 3px;
  margin: 3px;
  border-radius: 5px;
  display: flex;
  font-size: 12px;
  justify-content: center;
  align-self: center;
`;

export const CardScoreContainer = styled.p`
  background-color: ${(props) => {
    if (props.type === "dare") return "#FB5156";
    else if (props.type === "truth") return "#64c0fa";
  }};
  padding: 10px;
  color: #ffffff;
  font-weight: 600;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: center;
`;
export const WildCardScoreContainer = styled.p`
  background-color: #ffffff;
  padding: 10px;
  font-family: "Open Sans", sans-serif;
  color: #000000;
  font-size: 1.45rem;
  font-weight: 600;
  border-radius: 100%;
  width: 40px;
  height: 40px;
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: center;
`;

// justify-content: center;
//   align-items: center;
//   padding-top: 20px;
//   top: 37px;
//   right: 20px;
//   text-align: right;
