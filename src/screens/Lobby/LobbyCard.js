import React from "react";
import Participant from "../Participant";
import { getRandomInt } from "../../helpers";
import {
  StyledCard,
  StyledFlex,
  StyledAvatar,
  StyledHeading,
  StyledBox,
  StyledButtonContainer,
  StyledButton,
  StyledBadge,
  StyledCheckIcon,
  StyledCloseIcon,
} from "./LobbyStyles";
import { Box } from "rebass";

function LobbyCard({ playerInfo, twilioUserInfo, userId }) {
  console.log({ twilioUserInfo });
  return (
    <Box p={3} width={1 / 4} color="white" bg="primary">
      <StyledCard
        width={256}
        sx={{
          borderRadius: 8,
          boxShadow: "0 0 16px rgba(0, 0, 0, .25)",
        }}
      >
        {/* <StyledAvatar
          src={`https://robohash.org/${
            playerInfo.username
          }/size=100x100?set=set${getRandomInt(4)}`}
          sx={{
            width: 100,
            height: 100,
            borderRadius: 9999,
          }}
        /> */}
        {twilioUserInfo && (
          <Participant
            key={twilioUserInfo?.sid}
            participant={twilioUserInfo}
            userId={userId}
          />
        )}
        <StyledHeading>{playerInfo?.username}</StyledHeading>
        {playerInfo?.ready ? (
          <StyledBox
            sx={{
              maxWidth: 512,
              mx: "auto",
              px: 3,
            }}
          >
            <StyledCheckIcon />
          </StyledBox>
        ) : (
          <StyledBox
            sx={{
              maxWidth: 512,
              mx: "auto",
              px: 3,
            }}
          >
            <StyledCloseIcon />
          </StyledBox>
        )}
        <StyledBadge sx={{ mx: "auto" }}>
          {playerInfo?.ready
            ? `${playerInfo?.username} ready!`
            : `${playerInfo?.username} not ready!`}
        </StyledBadge>
      </StyledCard>
    </Box>
  );
}

export default LobbyCard;
