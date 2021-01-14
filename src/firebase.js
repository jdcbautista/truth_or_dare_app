import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnBHQu1jUpzuz-rymVFxtBsbOFVnPuxsA",
  authDomain: "firestore-project-a4b07.firebaseapp.com",
  projectId: "firestore-project-a4b07",
  storageBucket: "firestore-project-a4b07.appspot.com",
  messagingSenderId: "423972607278",
  appId: "1:423972607278:web:7457d57f2227c1b5e016bf",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

/**
 * @description getGame
 * Returns a single game object based on gameId
 * @params gameId - {string} - the id of the targeted game
 */
export const getGame = async (gameId) => {
  const snapshot = await db.collection("game").doc(gameId).get();
  return snapshot;
};

/**
 * @description getGames
 * Queries all rooms and returns an array of all game documents
 */
export const getlGames = async () => {
  const snapshot = await db.collection("rooms").get();
  return snapshot.docs.map((doc) => doc.data());
};

/**
 * @description addPlayer
 * Adds a  new player to the targeted game
 * @params userName - {string} - the id of the targeted user
 * @params userId - {string} - the id of the targeted user
 */
export const addPlayer = async (newPlayer, gameId) => {
  const { userId, username } = newPlayer;
  const snapshot = await db
    .collection("rooms")
    .doc(gameId)
    .collection("players")
    .doc(userId)
    .set({
      id: userId,
      username: username,
      ready: false,
      video: false,
      audio: false,
      score: 0,
    });
  return snapshot;
};

/**
 * @description getPlayers
 * Queries all players from a targeted game and returns an array of all player documents
 * @params gameId - {string} - the id of the targeted game
 */
export const getPlayers = async (gameId) => {
  const snapshot = db.collection("rooms").doc(gameId).collection("players");

  return snapshot;
};

/**
 * @description getPlayerObject
 * Queries all players and returns data object for selected playerID
 * @params gameId - {string} - the id of the targeted game
 * @params playerId - {string} - the id of the targeted player
 */

export const getPlayerObject = async (playerID, gameID) => {
  const player = db
    .collection("rooms")
    .doc(gameID)
    .collection("players")
    .where("id", "==", playerID);
  const fetchPlayer = await player.get();
  const playerData = fetchPlayer.docs[0].data();
  return playerData;
};

/**
 * @description trackHotseatPlayer
 * Sets the identified player as the Hotseat player for the identified game
 * @params gameId - {string} - the id of the targeted game
 * @params playerId - {string} - the id of the targeted player
 */

export const trackHotseatPlayer = async (playerID, gameID) => {
  const setHotseatPlayer = await db.collection("rooms").doc(gameID).update({
    hotseatPlayer: playerID,
  });
  return setHotseatPlayer;
};

/**
 * @description videoToggle
 * toggles player video status
 * (note: assumes the front end call of this function can pass the current video on/off status (to reduce db reads); can be refactored to query db for this status if needed)
 * @params userID - {string} - the player object id
 * @params gameId - {string} - the id of the targeted game
 * @params currentVideoStatus - {bool} - true/false value of video status
 */
export const videoToggle = async (userId, gameId) => {
  const currentVideoStatus = await getVideoToggleStatus(userId, gameId);
  console.log(userId);
  // const {userId} = updatedPlayer
  const snapshot = db
    .collection("rooms")
    .doc(gameId)
    .collection("players")
    .doc(userId)
    .update({
      video: !currentVideoStatus,
    });
  return snapshot;
};

export const getVideoToggleStatus = async (userId, gameId) => {
  const player = await getPlayerObject(userId, gameId);

  console.log(player.video);
  return player.video;
};
//   const snapshot = db
//     .collection("rooms")
//     .doc(gameId)
//     .collection("players")
//     .doc(userId);

//   if (currentVideoStatus) {
//     await snapshot.update({
//       video: false,
//     });
//   } else {
//     await snapshot.update({
//       video: true,
//     });
//   }
//   return snapshot;
// };

/**
 * @description readyPlayer
 * Adds a  new player to the targeted game
 * @params updatedPlayer - {string} - the updated player object
 * @params gameId - {string} - the id of the targeted game
 */
export const readyPlayer = async (userId, gameId) => {
  console.log(userId);
  // const {userId} = updatedPlayer
  const snapshot = await db
    .collection("rooms")
    .doc(gameId)
    .collection("players")
    .doc(userId)
    .update({
      ready: true,
    });
  return snapshot;
};

/**
 * @description addCardsToAllPlayers
 * Collects list of all players in game, calls dealCard to move N cards from game deck to each player
 * @params gameID - {string} - the id of the game where all player will be dealt card(s)
 * @params numCardsToAdd - {integer} - number of cards to deal to each player from gameDeck
 *
 * @description dealCard
 * Takes N cards from game deck, copies to indicated player's hand, deletes card(s) from game deck
 * @params gameID - {string} - the id of the game where the player will be dealt card(s)
 * @params playerId - {string} - the id of the player to receive a card
 * @params numCardsToAdd - {integer} - number of cards to deal to player from gameDeck
 */

export const dealCard = async (gameID, playerID, numCardsToAdd) => {
  const allCards = db.collection("rooms").doc(gameID).collection("gameDeck");
  const startingHands = await allCards.limit(numCardsToAdd).get();
  for (let startingCard of startingHands.docs) {
    console.log(startingCard.id);
    // eslint-disable-next-line
    let playerCards = await db
      .collection("rooms")
      .doc(gameID)
      .collection("players")
      .doc(playerID)
      .collection("cards")
      .doc(`${startingCard.id}`)
      .set({
        id: startingCard.data().id,
        text: startingCard.data().text,
        type: startingCard.data().type,
        points: startingCard.data().points,
        playedBy: playerID,
      });
    // eslint-disable-next-line
    let deleteCard = await startingCard.ref.delete();
  }
  return "success";
};

export const addCardsToAllPlayers = async (gameID, numCardsToAdd) => {
  const players = db.collection("rooms").doc(gameID).collection("players");
  const playerList = await players.get();

  for (let player of playerList.docs) {
    await dealCard(gameID, player.data().id, numCardsToAdd);
  }
  return "success";
};

/**
 * @description loadDeckFromResources
 * Use to transfer deck from resources into gameDeck collection in the gamestate
 * @params none
 *
 * @description loadGameDeck
 * Called in getTruthDeck async/await func. Takes deck loaded from resources and adds it to gameDeck collection * in firestore
 * @params deck - {array of Firestore document.data() objects} - array that contains the data of the cards in resources collection that will be copied to game collection
 *
 */

const loadGameDeck = async (deck) => {
  const gameDeck = db.collection("rooms").doc("game1").collection("gameDeck");
  const checkEmpty = await gameDeck.limit(1).get();
  console.log(checkEmpty.docs.length);
  if (!checkEmpty.docs.length) {
    console.log("loading deck");
    await deck.forEach(async (card) => {
      await gameDeck.add({
        id: card.id,
        text: card.text,
        type: card.type,
        points: card.points,
      });
    });
    return deck;
  } else {
    console.log("did not load deck");
  }
};

export const loadDeckFromResources = async () => {
  let deckArr = [];
  const loadDeck = db.collection("resources").doc("Deck1").collection("cards");
  let deck = await loadDeck.get();
  for (let card of deck.docs) {
    deckArr.push(card.data());
  }
  await loadGameDeck(deckArr);
  return "success";
};

/**
 * @description getHand
 * returns target players hand
 * @params playerID - player id (auto-generated hash in firestore collection)
 * @params gameID - the game id (hardcode 'game1' when calling function)
 */
export const getHand = async (playerId, gameID) => {
  let handArr = [];
  const loadDeck = db
    .collection("rooms")
    .doc(gameID)
    .collection("players")
    .doc(playerId)
    .collection("cards");
  let deck = await loadDeck.get();
  for (let card of deck.docs) {
    handArr.push(card.data());
    console.log("card doc id", card.id);
  }
  return handArr;
};

/**
 * @description toBool
 * changes string input into boolean output
 * @params string - string to be converted to bool
 */
export function toBool(string) {
  if (string === "true") {
    return true;
  } else {
    return false;
  }
}

/**
 * @description advancePhase
 * upon running function phase is advanced to next phase, if on cleanup restarts phase order when run
 * @params gameID - the game id (hardcode 'game1' when calling function)
 */
export const advancePhase = async (gameID) => {
  const snapshot = await db.collection("rooms").doc(gameID);
  const snapshotDoc = await snapshot.get();
  const currentPhase = await snapshotDoc.data().phase;

  const phases = [
    "setup",
    "playCard",
    "completeDare",
    "voteCompleteDare",
    "cleanup",
  ];
  let phaseIndex = phases.indexOf(currentPhase);
  // console.log(phaseIndex)
  if (phaseIndex === phases.length - 1) {
    await snapshot.update({
      phase: phases[0],
    });
  } else {
    await snapshot.update({
      phase: phases[phaseIndex + 1],
    });
  }
  return phaseIndex;
};

/**
 *
 * @description playCard
 * takes card from players hand and moves it to the field
 *
 * (note: maybe we don't need to pull the card out of a hand with an ID depending on if we only have hash or if we have the whole object)
 * @params gameID - {string} - the id of the game where the player will be dealt card(s)
 * @params playerId - {string} - the id of the player to receive a card
 * @params cardID - {} - the id of the being card played
 */

export const playCard = async (gameID, playerID, cardID) => {
  const cardInHand = db
    .collection("rooms")
    .doc(gameID)
    .collection("players")
    .doc(playerID)
    .collection("cards")
    .doc(cardID);
  const cardToPlay = await cardInHand.get();
  const cardData = cardToPlay.data();
  // eslint-disable-next-line
  let playerCards = await db
    .collection("rooms")
    .doc(gameID)
    .collection("field")
    .doc(cardID)
    .set({
      id: cardData.id,
      text: cardData.text,
      type: cardData.type,
      points: cardData.points,
      playedBy: playerID,
    });
  // eslint-disable-next-line
  let deleteCard = await cardInHand.delete();
  // console.log('card played')
  return "success";
};
