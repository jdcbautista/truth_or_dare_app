import React, { useState } from "react";
import { Flex, Link, Text, Box } from "rebass";
import { DebugButton, ToggleDebugButton } from "../LobbyStyles";
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
  gameRound,
  loadDeck,
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
        <RoundCounter>Round {gameRound}</RoundCounter>
        
        <ToggleDebugButton onClick={() => setDebugMode(!debugMode)}>
          Toggle Debug
        </ToggleDebugButton>
        <GameName>truth or dare</GameName>
        
        <NavbarText>
          <AiOutlineInfoCircle onClick={toggleModal} color="black" />
        </NavbarText>
        <StyledModal isOpen={modalOpen} onBackgroundClick={toggleModal}>
          <Flex>
            <Box>
              <StyledModalText size="md">Game Rules:</StyledModalText>
              <StyledModalText size="sm">
                The hotseat player who will select a truth or dare card will be
                outlined in gold.
              </StyledModalText>
              <StyledModalText size="sm">
                Game will end when a player reaches X points.
              </StyledModalText>
              <StyledModalText size="md">Instructions:</StyledModalText>
              <StyledModalText size="sm">
                1. Non-Hotseat players chooses a truth or dare card to play from
                their hand.
              </StyledModalText>
              <StyledModalText size="sm">
                2. Hotseat Player will choose one card to execute.
              </StyledModalText>
              <StyledModalText size="sm">
                3. Non-hotseat players will vote on whether or not task was
                completed successfully.
              </StyledModalText>
              <StyledModalText size="sm">
                4. Points will be added to hotseat player score if approved by
                non-hotseat players.
              </StyledModalText>
              <StyledModalText size="sm">
                5. Turn will end and next hotseat player will be selected.
              </StyledModalText>
            </Box>
          </Flex>
        </StyledModal>
      </NavbarContainer>
      <DebugContainer debugMode={debugMode}>
          <DebugButton onClick={loadDeck}>Load Deck</DebugButton>
          <DebugButton onClick={showHand}>Show Hand</DebugButton>
          <DebugButton onClick={deleteField}>Delete Field</DebugButton>
          <DebugButton onClick={startGame}>Start Game</DebugButton>
          <DebugButton onClick={advanceHotseat}>Advance Hotseat</DebugButton>
          <DebugButton onClick={endVotingTimer}>End Voting Phase</DebugButton>
          <DebugButton onClick={endFadeTimer}>End Fade to Cleanup</DebugButton>
        </DebugContainer>
    </>
  );
}

export default Navbar;
