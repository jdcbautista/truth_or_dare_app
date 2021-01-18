import React, { useState } from "react";
import { Flex, Link, Text, Box } from "rebass";
import { DebugButton } from "../LobbyStyles";
import { AiOutlineInfoCircle } from "react-icons/ai";
import  Timer  from "../../Game/components/Timer.js"
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
  endVotingTimer,
  endFadeTimer
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <Flex px={2} color="black" bg="white" alignItems="center">
        <Text p={2} fontWeight="bold">
          Round 'counter'
        </Text>
        <DebugButton onClick={startGame}>Start Game</DebugButton>
        <DebugButton onClick={advanceHotseat}>Advance Hotseat</DebugButton>
        <DebugButton onClick={endVotingTimer}>End Voting Phase</DebugButton>
        <DebugButton onClick={endFadeTimer}>End Fade to Cleanup</DebugButton>

        
        Truth or Dare
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
