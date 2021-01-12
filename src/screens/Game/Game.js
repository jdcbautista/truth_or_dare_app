import Cards from "./components/Cards";
import Timer from "./components/Timer";
import Participant from "../Lobby/components/Participant";
import CardRender from "./components/cardRender"
import { gsap } from "gsap";
import React, { useState, useEffect, Suspense } from "react";
import { getTwilioToken } from "../../services/twilio";
import * as FirestoreService from "../../firebase";
import Video from "twilio-video";
import LobbyCard from "../Lobby/components/LobbyCard";
import LobbyInput from "../Lobby/components/LobbyInput";
import { checkIfReady } from "../../helpers";
import { LobbyContainer } from "../Lobby/LobbyStyles";
import { StyledFlex, DebugButton } from "../Lobby/LobbyStyles";
import { Card, Image, Heading, Flex, Box, Button } from "rebass";
import styled from "@emotion/styled";
import { Label, Input, Select, Textarea, Radio, Checkbox } from "@rebass/forms";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { getRandomInt } from "../../helpers";


//Temp styling from Emma & Jarrett's Lobby.js
const StyledCard = styled(Card)`
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  padding: 16px;
  height: 320px;
  text-align: center;
  background-color: #525252;
`;

const StyledAvatar = styled(Image)`
  background-color: #313131;
`;

const StyledHeading = styled(Heading)`
  font-family: sans-serif;
`;

const StyledBox = styled(Box)`
  position: relative;
  top: 110px;
`;

const StyledButtonContainer = styled(Box)`
  margin: 0 auto;
  margin-top: 50px;
`;

const StyledButton = styled(Button)`
  position: relative;
  top: 30px;
  background-color: #525252;
  color: #ffffff;
`;

const StyledBadge = styled(Box)`
  background-color: #313131;
  border-radius: 2px;
  position: relative;
  top: 105px;
  font-size: 10px;
`;

const StyledCheckIcon = styled(AiFillCheckCircle)`
  color: #96bb7c;
  width: 50px;
`;

const StyledCloseIcon = styled(AiFillCloseCircle)`
  color: #ec625f;
  width: 50px;
`;



const Game = ({ players, participants, userId }) => {
  {
    /* <Cards />
      <Timer /> 
      <PlayerList />
      
      <judgePanel />
      <hotSeatContainer /> */
  }

// JARRETT & EMMA:
//deals card (see dealCard in firebase.js) set to button in lobby.js
const handleCardDeal = async (e) => {
  e.preventDefault();
  await FirestoreService.addCardsToAllPlayers('game1', 3)
  }

//console.log's player hand (see firebase.js for getHand), used in onclick on button in render
const handleGetHand = async (e) => {
  e.preventDefault();
  const playerHand = await FirestoreService.getHand(e.target.value, 'game1')
  console.log(playerHand)
}

//reloads the game's truthStack collection with cards from resources/Deck1/Cards collection set to button in lobby.js
const handleLoadDeck = async (e) => {
  e.preventDefault();
  await FirestoreService.loadDeckFromResources().catch((error) =>
    console.log(error)
  );
};




  return (
    <div
      className="sessionInit"
      style={{ backgroundColor: "gray", padding: "10px", paddingTop: "10%" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          margin: "10px",
          backgroundColor: "pink",
          justifyContent: "center",
          height: "600px",
          borderRadius: "15px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "lightblue",
            margin: "10px",
            width: "100vw",
            borderRadius: "15px",
            textAlign: "center",
            justifyContent: "space-between",
          }}
        >
          <p>Player list component</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              margin: "10px",
              borderRadius: "15px",
              textAlign: "center",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                margin: "10px",
                backgroundColor: "lavender",
                height: "500px",
                borderRadius: "15px",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              {/* <p>Child 2</p> */}
              <div
                style={{
                  backgroundColor: "aquamarine",
                  justifyContent: "space-evenly",
                  margin: "10px",
                  width: "250px",
                  borderRadius: "15px",
                  height: "150px",
                }}
              >
                {/* <Participant
                  userId={userId}
                  participant={participants[0]}
                  videoHeight={200}
                /> */}
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  margin: "20px 10px 10px 10px",
                  borderRadius: "15px",
                  height: "300px",
                }}
              >
                <p>Card component</p>
              </div>
            </div>
            <div
              style={{
                margin: "10px",
                backgroundColor: "lavender",
                height: "500px",
                width: "250px",
                borderRadius: "15px",
                textAlign: "center",
              }}
            ><p> test </p> 
              <div
                style={{
                  backgroundColor: "aquamarine",
                  margin: "10px",
                  borderRadius: "15px",
                  height: "150px",
                }}
              >
                <p>Player Component</p>
              </div>
              <CardRender cardID="1" text="I dare you to..."/>
            </div>
            <div
              style={{
                margin: "10px",
                backgroundColor: "lavender",
                height: "500px",
                width: "250px",
                borderRadius: "15px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  backgroundColor: "aquamarine",
                  margin: "10px",
                  borderRadius: "15px",
                  height: "150px",
                }}
              >
                <p>Player Component</p>
              </div>
              <div
                style={{
                  backgroundColor: "white",
                  margin: "20px 10px 10px 10px",
                  borderRadius: "15px",
                  height: "300px",
                }}
              >
                <p>Card component</p>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            margin: "10px",
            backgroundColor: "lightblue",
            width: "400px",
            borderRadius: "15px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <p>hotseat player component</p>
          <div
            style={{
              margin: "10px",
              backgroundColor: "lavender",
              height: "500px",
              width: "250px",
              borderRadius: "15px",
              textAlign: "center",
            }}
          >
            <p>Player Component</p>
            
            <div
              style={{
                backgroundColor: "white",
                margin: "20px 10px 10px 10px",
                borderRadius: "15px",
                height: "410px",
              }}
            >
              <p>Twilio component</p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          backgroundColor: "pink",
          borderRadius: "15px",
          textAlign: "center",
          height: "150px",
        }}
      >
        <p>hand component</p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              margin: "20px 10px 10px 10px",
              borderRadius: "15px",
              height: "50px",
            }}
          >
            <p>Card component</p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              margin: "20px 10px 10px 10px",
              borderRadius: "15px",
              height: "50px",
            }}
          >
            <p>Card component</p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              margin: "20px 10px 10px 10px",
              borderRadius: "15px",
              height: "50px",
            }}
          >
            <p>Card component</p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              margin: "20px 10px 10px 10px",
              borderRadius: "15px",
              height: "50px",
            }}
          >
            <p>Card component</p>
          </div>
        </div>
      </div>
      <Flex>
        {players?.length &&
          players.map((Player) => (
            <div key={Player.id}>
              {/* test button for dealing deck */}
              <button value={Player.id} onClick={(e) => handleCardDeal(e)} >
                Deal Card
              </button>
              {/* test button for printing player hand */}
              <button value={Player.id} onClick={(e) => handleGetHand(e)} >
                Print Hand
              </button>
              <Box p={3} width={1 / 4} color="white" bg="primary">
                
              </Box>
            </div>
          ))}
      </Flex>
    </div>
  );
};

export default Game;

//background
// Set 3 second timer
// Lobby to game animation transition
// Draw random cards into hand
// Load playingField

//playingField has containers
//  judgePanel contains judgePlayer1 - judgePlayer3
//  hotSeat container contains player
//  handHandler

// Make callback or change firestore state,
// Change lobby's gameState from sessionInit to... roundStart

//roundStart
//

//roundEnd : game logic checks if game ends or returns to roundStart

//gameEnd : Winners stand triumphantly over losers
