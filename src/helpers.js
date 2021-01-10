export const checkIfReady = (players) => {
  let readyStatus = false;
  if (players) {
    for (let player of players) {
      if (player.ready) {
        readyStatus = true;
      } else {
        readyStatus = false;
        break;
      }
    }
  }
  return readyStatus;
};

export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
