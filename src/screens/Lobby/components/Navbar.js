import React, { useState } from "react";
import { Flex, Link, Text, Box } from "rebass";
import { DebugButton } from "../LobbyStyles";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  NavbarText,
  StyledModal,
  StyledModalText,
} from "../../../components/NavbarStyles";

function Navbar({
  showHand,
  startGame,
  loadDeck,
  deleteField,
  advanceHotseat,
  completeTask,
  addPoints,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <Flex px={2} color="white" bg="black" alignItems="center">
        <Text p={2} fontWeight="bold">
          Debug
        </Text>
        <DebugButton onClick={startGame}>Start Game</DebugButton>
        <DebugButton onClick={advanceHotseat}>Advance Hotseat</DebugButton>
        {/* <DebugButton onClick={loadDeck}>Load Deck</DebugButton> */}
        {/* <DebugButton onClick={deleteField}>Delete Field</DebugButton> */}
        <Box mx="auto" />
        <NavbarText>
          <AiOutlineInfoCircle onClick={toggleModal} />
        </NavbarText>
        <StyledModal isOpen={modalOpen} onBackgroundClick={toggleModal}>
          <Flex>
            <Box>
              <StyledModalText size="lg">Game Rules</StyledModalText>
            </Box>
          </Flex>
        </StyledModal>
      </Flex>
    </>
  );
}

export default Navbar;
