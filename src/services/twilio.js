const BASE = "http://localhost:8000/api";
const LIVE = "https://kind-bulldog-61.loca.lt/api";

export const getTwilioToken = async (userInfo) => {
  const { identity, room } = userInfo;
  return fetch(`${BASE}/token/`, {
    method: "POST",
    body: JSON.stringify({
      identity: identity,
      room: room,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
