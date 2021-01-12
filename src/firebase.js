import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useState } from "react";

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
export const db = firebase.firestore();

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
  // return snapshot.docs.map(doc => doc.data())
};

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

// export const editPlayer = (updatedPlayer) => {
//   setLoading();
//   ref
//     .doc(updatedPlayer.id)
//     .update(updatedPlayer)
//     .catch((err) => {
//       console.error(err);
//     });
// };

// export const addPlayer = (newPlayer) => {
//   ref
//     .doc(newPlayer.id)
//     .set(newPlayer)
//     .catch((err) => {
//       console.error(err);
//     });
// };

// export const deletePlayer = (Player) => {
//   ref
//     .doc(Player.id)
//     .delete()
//     .catch((err) => {
//       console.log(err);
//     });
//   setDisabled(false);
// };

// export const editPlayer = (updatedPlayer) => {
//   setLoading();
//   ref
//     .doc(updatedPlayer.id)
//     .update(updatedPlayer)
//     .catch((err) => {
//       console.error(err);
//     });
// };

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
        votes: card.votes,
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
  }
  return handArr;
};

//
