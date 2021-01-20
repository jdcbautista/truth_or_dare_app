import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { gsap } from "gsap";

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

export const GAMEROOM = "game1";
export const HANDLIMIT = 6;
export const FIELDLIMIT = 3;
export const WINNINGPOINTS = 5;
export const VOTETIME = 60000;
export const CLEANUPWAIT = 3000;

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

export const gameSetup = async (gameId) => {
  const snapshot = await db
    .collection("rooms")
    .doc(gameId)
    .collection("gamePhase")
    .doc("phase")
    .set({
      phase: "setup",
      taskComplete: false,
      cleanUpReady: false,
      round: 1,
    });
};

export const gameStart = async (gameId) => {
  const snapshot = await db
    .collection("rooms")
    .doc(gameId)
    .collection("gamePhase")
    .doc("phase")
    .set({
      phase: "playCard",
      taskComplete: false,
      cleanUpReady: false,
      round: 1,
    });
};

/**
 * @description addPlayer
 * Adds a  new player to the targeted game
 * @params userName - {string} - the id of the targeted user
 * @params userId - {string} - the id of the targeted user
 */
export const addPlayer = async (newPlayer, gameId) => {
  console.log({ newPlayer });
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
      hotseat: false,
      winner: false,
    });
  // await gameSetup(GAMEROOM).catch((err) => console.log(err));

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
 * @description videoToggle
 * toggles player video status
 * (note: assumes the front end call of this function can pass the current video on/off status (to reduce db reads); can be refactored to query db for this status if needed)
 * @params userID - {string} - the player object id
 * @params gameId - {string} - the id of the targeted game
 * @params currentVideoStatus - {bool} - true/false value of video status
 */
export const videoToggle = async (userId, gameId, currentVideoStatus) => {
  const snapshot = db
    .collection("rooms")
    .doc(gameId)
    .collection("players")
    .doc(userId);

  if (currentVideoStatus) {
    await snapshot.update({
      video: false,
    });
  } else {
    await snapshot.update({
      video: true,
    });
  }
  return snapshot;
};

/**
 * @description readyPlayer
 * Adds a  new player to the targeted game
 * @params updatedPlayer - {string} - the updated player object
 * @params gameId - {string} - the id of the targeted game
 */
export const readyPlayer = async (userId, gameId) => {
  //console.log(userId);
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
  const playerCards = await getHand(playerID, gameID);
  const remCapacity = HANDLIMIT - playerCards.length;
  const cardsToDeal =
    remCapacity >= numCardsToAdd ? numCardsToAdd : remCapacity;
  if (playerCards.length < HANDLIMIT) {
    const allCards = db.collection("rooms").doc(gameID).collection("gameDeck");
    const startingHands = await allCards.limit(cardsToDeal).get();
    for (let startingCard of startingHands.docs) {
      //console.log(startingCard.id);
      // eslint-disable-next-line
      let playerCards = await db
        .collection("rooms")
        .doc(gameID)
        .collection("players")
        .doc(playerID)
        .collection("cards")
        .doc(`${startingCard.id}`)
        .set({
          hashId: startingCard.id,
          id: startingCard.data().id,
          text: startingCard.data().text,
          type: startingCard.data().type,
          points: startingCard.data().points,
          playedBy: playerID,
          selected: false,
        });
      // eslint-disable-next-line
      let deleteCard = await startingCard.ref.delete();
    }
    return "success";
  } else {
    return "player hand full";
  }
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
  const gameDeck = db.collection("rooms").doc(GAMEROOM).collection("gameDeck");
  const checkEmpty = await gameDeck.limit(1).get();
  //console.log(checkEmpty.docs.length);
  if (!checkEmpty.docs.length) {
    //console.log("loading deck");
    await deck.forEach(async (card) => {
      await gameDeck.add({
        id: card.id,
        text: card.text,
        type: card.type,
        points: card.points,
      });
    });
    return deck;
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
 * @params gameID - the game id
 */
export const getHand = async (playerId, gameID) => {
  let handArr = [];
  const playerHand = db
    .collection("rooms")
    .doc(gameID)
    .collection("players")
    .doc(playerId)
    .collection("cards");
  let hand = await playerHand.get();
  for (let card of hand.docs) {
    let cardToPush = card.data();
    //add automated document title hash value to object with key 'hashId'
    cardToPush["hashId"] = card.id;
    handArr.push(cardToPush);
    //console.log("card doc id", card.id);
  }
  return handArr;
};

/**
 * @description getAllFieldCards
 * TODO
 * @params TODO
 * @params TODO
 */
export const getAllFieldCards = async (gameID) => {
  const loadField = db.collection("rooms").doc(gameID).collection("field");
  return loadField;
};

/**
 * @description getGamePhase
 * Finds the phase collection in a given game and returns the collection
 * @params gameId - {string} - the id of the targeted game
 */
export const getGamePhase = async (gameId) => {
  const snapshot = db.collection("rooms").doc(gameId).collection("gamePhase");

  return snapshot;
};

/**
 * @description playCard
 * takes card from players hand and moves it to the field
 *
 * (note: maybe we don't need to pull the card out of a hand with an ID depending on if we only have hash or if we have the whole object)
 * @params gameID - {string} - the id of the game where the player will be dealt card(s)
 * @params playerId - {string} - the id of the player to receive a card
 * @params cardID - {} - the id of the being card played
 */

export const playCard = async (gameID, playerID, cardID) => {
  //console.log(gameID, playerID, cardID);
  const playerObj = await getPlayerObject(playerID, gameID);
  const playerName = playerObj.username;
  //console.log(playerName);
  const fieldCards = await db
    .collection("rooms")
    .doc(gameID)
    .collection("field")
    .get();
  //console.log(fieldCards);
  const remCapacity = FIELDLIMIT - fieldCards.docs.length;
  if (remCapacity > 0) {
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
    let cardToField = await db
      .collection("rooms")
      .doc(gameID)
      .collection("field")
      .doc(cardID)
      .set({
        hashId: cardData.hashId,
        id: cardData.id,
        text: cardData.text,
        type: cardData.type,
        points: cardData.points,
        playedBy: playerID,
        selected: false,
        username: playerName,
      });
    // eslint-disable-next-line
    let deleteCard = await cardInHand.delete();
    // console.log('card played')
    return "success";
  } else {
    return "field is full";
  }
};

export const unsetHotseatPlayer = async (gameID) => {
  const playerCollection = await getPlayers(gameID);
  const players = await playerCollection.get();
  for (let i = 0; i < players.docs.length; i++) {
    const player = players.docs[i];
    const hotseat = player.data().hotseat;
    if (hotseat) {
      //console.log("pass hotseat check");
      // unset hotseat player and
      // return i
      await playerCollection.doc(player.data().id).update({
        hotseat: !hotseat,
        vote: "none",
      });
      if (i === players.docs.length - 1) {
        return -1;
      } else {
        return i;
      }
    }
  }
  return -1;
};

export const setHotseatPlayer = async (gameID) => {
  const previousHotseatIndex = await unsetHotseatPlayer(gameID);
  const playerCollection = await getPlayers(gameID);
  const players = await playerCollection.get();
  const phase = db
    .collection("rooms")
    .doc(gameID)
    .collection("gamePhase")
    .doc("phase");
  for (let i = 0; i < players.docs.length; i++) {
    const player = players.docs[i];
    if (i === previousHotseatIndex + 1) {
      //console.log(player.data());
      // unset hotseat player and
      // return i
      console.log('updating hotseat')
      if (player.data().username) {
        await phase.update({
          hotseatName: player.data().username,
          approved: false,
          cardPoints: 0,
        });
      }
      await playerCollection.doc(player.data().id).update({
        hotseat: true,
        vote: "none",
      });
      
      return player.data().id;
    }
  }
};

export const getPlayerScore = async (gameID, playerID) => {
  const playerObj = await getPlayerObject(playerID, gameID);
  const playerPoints = playerObj.score;
  return playerPoints;
};

export const addPointsToPlayer = async (gameID, lose = false) => {
  const cardData = await getSelectedFieldCard(gameID);
  const playerPoints = await getPlayerScore(gameID, cardData.selectedBy);
  let cardPoints = parseInt(cardData.points);
  if (lose) {
    cardPoints = -cardPoints;
  }
  const playerCollection = await getPlayers(gameID);
  const newScore = cardPoints + playerPoints;
  if (newScore >= WINNINGPOINTS) {
    await playerCollection.doc(cardData.selectedBy).update({
      score: newScore,
      winner: true,
    });
    return "gameOver";
  } else {
    await playerCollection.doc(cardData.selectedBy).update({
      score: newScore,
    });
  }
  return "score added";
};

export const clearPlayerPoints = async (gameID) => {
  const playerCollection = await getPlayers(gameID);
  const players = await playerCollection.get();
  for (let player of players.docs) {
    await player.ref.update({
      score: 0,
      winner: false,
    });
  }
  return "Score cleared!";
};

export const getSelectedFieldCard = async (gameID) => {
  const fieldCardsRef = db.collection("rooms").doc(gameID).collection("field");
  const fieldCards = await fieldCardsRef.where("selected", "==", true).get();
  return fieldCards.docs[0].data();
};

export const deleteField = async (gameID) => {
  const fieldDelete = db.collection("rooms").doc(gameID).collection("field");

  const deletedField = await fieldDelete.get();
  deletedField.docs.forEach(async (card) => {
    await card.ref.delete();
  });
};

export const cardSelectByHotseat = async (gameID, cardID, playerID) => {
  const player = await getPlayerObject(playerID, gameID);
  const phase = db
    .collection("rooms")
    .doc(gameID)
    .collection("gamePhase")
    .doc("phase");
  if (player.hotseat) {
    const fieldCollection = await db
      .collection("rooms")
      .doc(gameID)
      .collection("field")
      .get();
    let thumbsUpAdd = true;
    for (let card of fieldCollection.docs) {
      if (card.id === cardID) {
        await phase.update({
          cardPoints: card.data().points,
          votePhaseEnd: Date.now() + VOTETIME,
        });
        await card.ref.update({
          selected: true,
          selectedBy: playerID,
          yesNoSelected: "selected",
        });
        console.log(card.id, "selected");
      } else if (thumbsUpAdd) {
        await card.ref.update({
          yesNoSelected: "yes",
        });
        thumbsUpAdd = false;
        console.log(card.id, "added yes");
      } else {
        await card.ref.update({
          yesNoSelected: "no",
        });
        console.log(card.id, "added no");
      }
    }
  }
};

export const advanceRoundCounter = async (gameID) => {
  const snapshot = db
    .collection("rooms")
    .doc(gameID)
    .collection("gamePhase")
    .doc("phase");

  const roundObject = await snapshot.get().catch((err) => console.log(err));
  const roundData = roundObject.data();
  const round = roundData.round;

  const incrementRound = await snapshot
    .update({
      round: round + 1,
    })
    .catch((err) => console.log(err));

  // return await getRound(GAMEROOM).doc("round");
};

export const resetRoundCounter = async (gameID) => {
  const snapshot = db
    .collection("rooms")
    .doc(gameID)
    .collection("gamePhase")
    .doc("phase");
  const resetRound = await snapshot
    .update({
      round: 1,
    })
    .catch((err) => console.log(err));
  return;
};

/**
 * @description autoAdvancePhase
 * upon running function phase is advanced to next phase, if on cleanup restarts phase order when run
 * @params gameID - the game id
 */
export const autoAdvancePhase = async (gameID, cards, isHotseat) => {
  console.log('running auto advance phase')
  console.log('hotseat is', isHotseat)
  const snapshot = db
    .collection("rooms")
    .doc(gameID)
    .collection("gamePhase")
    .doc("phase");
  const selectCheck = cards.map((card) => card.selected);
  const snapshotCheck = await snapshot.get();
  const taskCompleteCheck = await snapshotCheck.data().taskComplete;
  const cleanUpReadyCheck = await snapshotCheck.data().cleanUpReady;
  if (cards.length === 3){
    gsap
      .timeline()

      .fromTo(
        ".gameContainerFadeIn",
        { filter: "blur(10px)" },
        { filter: "blur(0px)", duration: 1 }
      )
  }
  if (isHotseat){
    console.log('passes hotseat check')
    if (cards.length < 3) {
      await snapshot.update({
        phase: "playCard",
        taskComplete: false,
        cleanUpReady: false,
      });
    } else if (selectCheck.some((x) => x)) {
      console.log('passes selectCheck')
      if (!taskCompleteCheck) {
        console.log('passes completeCheck')
        await snapshot.update({
          phase: "voting",
          voteMargin: 0,
        });
      } else if (!cleanUpReadyCheck) {
        await snapshot.update({
          phase: "pre-cleanUp",
        });
      } else {
        await snapshot.update({
          phase: "cleanUp",
          taskComplete: false,
          cleanUpReady: false,
        });
        if (await snapshotCheck.data().approved) {
          const pointAdd = await addPointsToPlayer(GAMEROOM);
          if (pointAdd === "gameOver") {
            await snapshot.update({
              phase: "gameOver",
            });
            await resetRoundCounter(GAMEROOM);
            return "game over";
          }
        }
        await startRound(GAMEROOM)
      }
    }
    return "phase changed";
  };
}

export const getRound = async (gameID) => {
  const snapshot = db
    .collection("rooms")
    .doc(gameID)
    .collection("gamePhase")
    .doc("phase");

  const round = await snapshot.get();
  return round;
};

export const endVoting = async (gameID) => {
  const snapshot = db
    .collection("rooms")
    .doc(gameID)
    .collection("gamePhase")
    .doc("phase");

  const playerCollection = await getPlayers(gameID);
  const players = await playerCollection.get();
  let thumbsUp = 0;
  let thumbsDown = 0;
  for (let player of players.docs) {
    if (player.data().vote === "yes") {
      thumbsUp += 1;
    } else if (player.data().vote === "no") {
      thumbsDown += 1;
    }
  }
  console.log(thumbsUp, "yays", thumbsDown, "nays");
  const isApproved = thumbsUp > thumbsDown;

  await snapshot.update({
    taskComplete: true,
    approved: isApproved,
  });

  const fieldCards = await db
    .collection("rooms")
    .doc(gameID)
    .collection("field")
    .get();

  const firstFieldCard = fieldCards.docs[0];
  await firstFieldCard.ref.update({
    trigger: "endVoting trigger",
  });

  const waitToCleanup = (x) => new Promise((r) => setTimeout(r, x));
  await (async () => {
    await waitToCleanup(CLEANUPWAIT);
  })();
  await cleanupStart(GAMEROOM);
};

export const playerVote = async (gameId, userId, yesNo) => {
  const player = db
    .collection("rooms")
    .doc(gameId)
    .collection("players")
    .doc(userId);

  const playerGet = await player.get();
  const isHotseat = await playerGet.data().hotseat;

  if (!isHotseat) {
    if (yesNo === "yes") {
      await player.update({
        vote: "yes",
      });
      console.log(userId, "votes yes");
    } else if (yesNo === "no") {
      await player.update({
        vote: "no",
      });
      console.log(userId, "votes no");
    }
  }
};

export const cleanupStart = async (gameID) => {
  const snapshot = db
    .collection("rooms")
    .doc(gameID)
    .collection("gamePhase")
    .doc("phase");

  await snapshot.update({
    cleanUpReady: true,
  });

  const fieldCards = await db
    .collection("rooms")
    .doc(gameID)
    .collection("field")
    .get();

  const firstFieldCard = fieldCards.docs[0];
  await firstFieldCard.ref.update({
    trigger: "cleanup trigger",
  });
};

export const setWildCardText = async (
  gameID,
  playerID,
  cardID,
  wildCardText
) => {
  const cardInHand = db
    .collection("rooms")
    .doc(gameID)
    .collection("field")
    .doc(cardID);
  const cardToEdit = await cardInHand
    .update({
      text: wildCardText,
    })
    .catch((err) => console.log(err));
};

export const startGame = async () => {
  
  await gameSetup(GAMEROOM).catch((err) => console.log(err))
  await deleteField(GAMEROOM).catch((err) => console.log(err));
  await clearPlayerPoints(GAMEROOM).catch((err) => console.log(err));
  await gameStart(GAMEROOM).catch(err => console.log(err));
  await setHotseatPlayer(GAMEROOM).catch((err) => console.log(err));

  await gsap
    .timeline()
    .fromTo(
      ".gameContainerFadeIn",
      { filter: "blur(0px)", opacity: 1 },
      { filter: "blur(10px)", opacity: 1, duration: 2 }
    )
    .fromTo(
      ".handContainerFadeIn",
      { opacity: 0, filter: "blur(40px)", transform: "translateY(400px)" },

      {
        opacity: 1,
        filter: "blur(0px)",
        transform: "translateY(0px)",
        duration: 0.8,
      }
    );
};

export const startRound = async () => {
  await advanceRoundCounter(GAMEROOM).catch((err) => console.log(err));
  await setHotseatPlayer(GAMEROOM).catch((err) => console.log(err));
  await deleteField(GAMEROOM).catch((err) => console.log(err));

  await gsap
    .timeline()
    .catch((err) => console.log(err))
    .fromTo(
      ".gameContainerFadeIn",
      { filter: "blur(0px)", opacity: 1 },
      { filter: "blur(10px)", opacity: 1, duration: 2 }
    )
    .catch((err) => console.log(err))
    .fromTo(
      ".handContainerFadeIn",
      { opacity: 0, filter: "blur(40px)", transform: "translateY(400px)" },

      {
        opacity: 1,
        filter: "blur(0px)",
        transform: "translateY(0px)",
        duration: 0.8,
      }
    )
    .catch((err) => console.log(err));
};
