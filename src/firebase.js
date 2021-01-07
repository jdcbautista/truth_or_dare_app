import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz7iLFrUKa_CrprXc9CuPCUJNEjN96S6A",
  authDomain: "loyal-parser-258500.firebaseapp.com",
  projectId: "loyal-parser-258500",
  storageBucket: "loyal-parser-258500.appspot.com",
  messagingSenderId: "573638032527",
  appId: "1:573638032527:web:46fd305b4c540c384b84fa",
  measurementId: "G-RB8BRNDRCN",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const authenticateAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

export const getGame = (gameId) => {
  return db.collection("game").doc(gameId).get();
};
export const addPlayer = (userName, userId) => {
  console.log({ userName, userId });
  return db.collection("game").add({
    userId: userId,
    name: userName,
    points: 0,
  });
};

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
