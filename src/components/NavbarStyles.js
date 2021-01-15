import { Flex, Link, Text, Box } from "rebass/styled-components";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled, { keyframes, css } from "styled-components";
import Modal from "styled-react-modal";
import modalBackground from "../images/modal_background_svg.svg";

export const NavbarText = styled(Text)`
  font-family: "Open Sans", sans-serif;
  font-size: 25px;
  display: flex;
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
  font-size: ${(props) => {
    if (props.size === "lg") return "3rem";
    return "1rem";
  }};
  font-family: "Open Sans", sans-serif;
`;
