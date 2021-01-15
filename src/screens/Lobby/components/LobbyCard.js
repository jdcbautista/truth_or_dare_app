import React from "react";
import Participant from "./Participant";
import {
  StyledCard,
  StyledHeading,
  // StyledBox,
  StyledReadyButton,
  StyledBadge,
  StyledAvatar,
  StyledScoreContainer,
  StyledCheckIcon,
  StyledCloseIcon,
} from "../LobbyStyles";
import { Box } from "rebass";

function LobbyCard({
  playerInfo,
  gamePhase,
  twilioUserInfo,
  userId,
  user,
  handleReadyClick,
  cardWidth = 256,
  cardHeight = 310,
  defaultCard,
}) {
  return (
    <>
      {defaultCard ? (
        <Box p={3} width={1 / 4} color="white" bg="primary">
          <StyledCard
            width={cardWidth}
            sx={{
              borderRadius: 8,
              boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
            }}
          >
            <StyledAvatar
              displayoff={false}
              src={`https://robohash.org/${Math.random() * 2000}/size=200x300`}
              sx={{
                height: cardHeight,
              }}
            />

            <StyledBadge sx={{ mx: "auto" }}>Waiting for player...</StyledBadge>
          </StyledCard>
        </Box>
      ) : (
        <Box p={3} width={1 / 4} color="white" bg="primary">
          <StyledCard
            width={cardWidth}
            sx={{
              borderRadius: 8,
              boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
            }}
          >
            {twilioUserInfo && userId && user && (
              <Participant
                key={twilioUserInfo?.sid}
                gamePhase={gamePhase}
                participant={twilioUserInfo}
                userId={userId}
                user={user}
              />
            )}

            <StyledHeading>{playerInfo?.username}</StyledHeading>

            {gamePhase.phase !== "setup" && (
              <StyledScoreContainer>
                score: {playerInfo?.score}
              </StyledScoreContainer>
            )}

            {twilioUserInfo && !playerInfo?.ready && (
              <StyledReadyButton onClick={handleReadyClick}>
                I'm Ready!
              </StyledReadyButton>
            )}
          </StyledCard>
        </Box>
      )}
    </>
  );
}

export default LobbyCard;
