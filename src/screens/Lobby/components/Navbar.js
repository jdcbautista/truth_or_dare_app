import React, { useState } from "react";
import { Flex, Link, Text, Box } from "rebass";
import { DebugButton } from "../LobbyStyles";
import { AiOutlineInfoCircle } from "react-icons/ai";
import Timer from "../../Game/components/Timer.js";
import {
  NavbarContainer,
  NavbarText,
  StyledModal,
  StyledModalText,
  GameName,
  StyledInfoIcon,
  RoundCounter,
  DebugContainer,
} from "../../../components/NavbarStyles";

function Navbar({
  showHand,
  startGame,
  loadDeck,
  roundNumber,
  deleteField,
  advanceHotseat,
  completeTask,
  addPoints,
  endVotingTimer,
  endFadeTimer,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [debugMode, setDebugMode] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <>
      <NavbarContainer>
        <DebugButton onClick={() => setDebugMode(!debugMode)}>
          Toggle Debug
        </DebugButton>
        <RoundCounter>Round {roundNumber}</RoundCounter>
        <GameName>truth or dare</GameName>
        <DebugContainer debugMode={debugMode}>
          <DebugButton onClick={loadDeck}>Load Deck</DebugButton>
          <DebugButton onClick={deleteField}>Delete Field</DebugButton>
          <DebugButton onClick={startGame}>Start Game</DebugButton>
          <DebugButton onClick={advanceHotseat}>Advance Hotseat</DebugButton>
        </DebugContainer>
        <NavbarText>
          <AiOutlineInfoCircle onClick={toggleModal} color="black" />
        </NavbarText>
        <StyledModal isOpen={modalOpen} onBackgroundClick={toggleModal}>
          <Flex>
            <Box>
              <StyledModalText size="lg">Game Rules</StyledModalText>
            </Box>
          </Flex>
        </StyledModal>
      </NavbarContainer>
    </>
  );
}

export default Navbar;
