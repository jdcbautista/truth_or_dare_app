import { Flex, Link, Text, Box } from "rebass/styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled, { keyframes, css } from "styled-components";
import Modal from "styled-react-modal";
import modalBackground from "../images/modal_background_svg.svg";

export const NavbarText = styled(Text)`
  font-family: "Open Sans", sans-serif;
  font-size: 25px;
  padding: 10px;
  flex-grow: 1;
  width: 33%;
  justify-content: flex-end;
  display: flex;
`;

export const NavbarContainer = styled(Flex)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledInfoIcon = styled(AiOutlineInfoCircle)`
  color: #663399;
`;
export const StyledModal = Modal.styled`
  width: 50rem;
  color: white;
  background-repeat: no-repeat;
  height: 50rem;
  padding: 20px;
  display: flex;
  border-radius: 10px;
  justify-content: center;
  background-color: #212121;
`;

export const StyledModalText = styled.h2`
  flex-grow: 1;
  justify-content: center;
  font-size: ${(props) => {
    if (props.size === "lg") return "3rem";
    return "1rem";
  }};
  font-family: "Open Sans", sans-serif;
`;
export const GameName = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: 1.5rem;
  display: flex;
  width: 33%;
  justify-content: center;
  padding: 10px;
  flex-grow: 1;
  font-weight: lighter;
  background: linear-gradient(to right, #23b5d3 42%, #858585 54%, #fe5148 20%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const RoundCounter = styled.p`
  font-family: "Open Sans", sans-serif;
  font-size: 1.25rem;
  display: flex;
  width: 33%;
  padding: 10px;
  flex-grow: 1;
  color: #663399;
`;
export const DebugContainer = styled.div`
  display: flex;
  visibility: ${(props) => {
    if (props.debugMode) return "hidden";
    else {
      return "visible";
    }
  }};
`;
