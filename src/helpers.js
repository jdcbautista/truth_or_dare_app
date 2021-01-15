export const checkIfReady = (players) => {
  let readyStatus = false;

  if (players.length > 3) {
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

export const generateRandomNumber = () => {
  return Math.floor(Math.random() * 10);
};
