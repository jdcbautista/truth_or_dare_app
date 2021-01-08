const BASE = "http://localhost:8000/api";

export const getTwilioToken = async (userInfo) => {
  const { identity, room } = userInfo;
  console.log(identity, room);

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
