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
export const getAllGames = async () => {
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
  const snapshot = await db
    .collection("rooms")
    .doc(gameId)
    .collection("players");

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
