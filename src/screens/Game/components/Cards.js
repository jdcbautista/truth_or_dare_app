// import './App.css';
import { db } from "../../../firebase";
// import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
// import Timer from './components/timer.js'

function Cards() {
  let myhand = [];
  const resources = db.collection("resources");
  const randomDraw = (mockArray, cardsInHand = 0, handMax = 3) => {
    let hand = [];
    for (let i = cardsInHand; i < handMax; i++) {
      let max = mockArray.length;
      let rando = Math.floor(Math.random() * (max - 1) + 1);
      if (!hand.includes(mockArray[rando])) {
        hand.push(mockArray[rando]);
      } else {
        i--;
      }
    }
    console.log(hand);
  };

  const readStack = async () => {
    const snapshot = await db
      .collection("rooms")
      .doc("game1")
      .collection("truthStack")
      .get();
    // const snapshot = await db
    // .collection("resources")
    // .doc("Deck1")
    // .collection('cards')
    // .get()

    return snapshot.docs.map((doc) => doc.data());
  };

  const duplicateStack = async () => {
    const cardsToCopy = await readStack();

    cardsToCopy.map(async (card) => {
      const snapshot = await db
        .collection("rooms")
        .doc("game1")
        .collection("truthDeck")
        .doc("truth" + `${card.id}`)
        .set({
          id: card.id,
          text: card.text,
          type: card.type,
          pointValue: Math.floor(Math.random() * 10),
        });
    });
  };

  const createDecks = () => {
    //pull from json
    //
    // let mockDeck = [
    //   { id: 1,
    //     type: 'dare',
    //     votes: 0,
    //     text: "I dare you to say one..." },
    //   { id: 2,
    //     type: 'dare',
    //     votes: 0,
    //     text: "I dare you to say two..." },
    //   { id: 3,
    //     type: 'dare',
    //     votes: 0,
    //     text: "I dare you to say three..." },
    //   { id: 4,
    //     type: 'dare',
    //     votes: 0,
    //     text: "I dare you to say four..." },
    //   { id: 5,
    //     type: 'dare',
    //     votes: 0,
    //     text: "I dare you to say five..." },
    //   { id: 6,
    //     type: 'dare',
    //     votes: 0,
    //     text: "I dare you to say six..." }]
    // randomDraw(mockDeck)
  };

  const createHand = () => {
    let sourceStack = readStack();

    let hand = randomDraw(sourceStack);
  };

  const showHand = () => {
    let mockhand = [
      {
        id: 2,
        type: "dare",
        votes: 0,
        text: "I dare you to say two...",
        image: "url",
      },
      {
        id: 3,
        type: "dare",
        votes: 0,
        text: "I dare you to say three...",
        image: "url",
      },
      {
        id: 5,
        type: "dare",
        votes: 0,
        text: "I dare you to say five...",
        image: "url",
      },
    ];
  };

  const cardRender = (cardprops) => {
    //I take in card ID and render the card
  };

  return (
    <div className="CARDS">
      <h1>CARDS</h1>
      <button onClick={() => duplicateStack()}> DUPLICATE STACK</button>
      <button onClick={() => randomDraw()}> RANDOM DRAW</button>

      {/* <button onClick={() => createDecks()}> LOAD CARD</button>
        <button onClick={() => showHand()}> SHOW CARD</button> */}

      <h2> </h2>
    </div>
  );
}

export default Cards;
