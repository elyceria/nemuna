console.log("LOADING TWITCH FILE");

const axios = require("axios");
const {sendTwitchLive} = require("./embeds");

const STREAMERS = {
  elyceria: { channelId: "1518563854768934912" },
  krytouz: { channelId: "1429741273052483725" }
};

let cachedToken = null;
let tokenExpiry = null;

const fs = require("fs");

let lastTwitchId = fs.existsSync("./stream.json")
  ? JSON.parse(fs.readFileSync("./stream.json")).id
  : null;

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken;
  }

  const response = await axios.post(
    "https://id.twitch.tv/oauth2/token",
    null,
    {
      params: {
        client_id: process.env.TWITCH_CLIENT_ID,
        client_secret: process.env.TWITCH_CLIENT_SECRET,
        grant_type: "client_credentials"
      }
    }
  );

  cachedToken = response.data.access_token;
  tokenExpiry = Date.now() + response.data.expires_in * 1000;

  return cachedToken;
}

async function getTwitchData(username) {
  try {
    const token = await getAccessToken();
    const response = await axios.get(
      `https://api.twitch.tv/helix/streams?user_login=${username}`,
      {
        headers: {
          "Client-ID": process.env.TWITCH_CLIENT_ID,
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log(response.data);
    const stream = response.data.data?.[0];

    if (!stream) return null;
    return {
      id: stream.id,
      title: stream.title,
      game: stream.game_name,
      url: `https://twitch.tv/${username}`,
      thumbnail: stream.thumbnail_url
        .replace("{width}", "1280")
        .replace("{height}", "720")
    };

  } catch (error) {
    console.error("twitch API:", error.message);
    return null;
  }
}

async function checkTwitch(client) {
  for (const username of Object.keys(STREAMERS)) {
    const stream = await getTwitchData(username);

    if (!stream) continue;

    if (stream.id === lastTwitchId?.[username]) continue;

    lastTwitchId = {
      ...lastTwitchId,
      [username]: stream.id
    };

    fs.writeFileSync("./stream.json", JSON.stringify(lastTwitchId));

    const channel = await client.channels.fetch(
      STREAMERS[username].channelId
    );

    await sendTwitchLive(channel, stream, username);
  }
}

console.log("EXPORTING CHECKTWITCH");
module.exports = {checkTwitch};