require("dotenv").config();

const {Client,GatewayIntentBits} = require("discord.js");
const teststream = require("./commands");
const { checkTwitch } = require("./twitch");

console.log(require("./twitch"));

const CHANNEL_ID = "1518563854768934912";

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === teststream.name) {
    await teststream.execute(interaction);
  }
});

client.once("clientReady", async () => {
  try {
    console.log(`logged in: ${client.user.tag}`);

    const channel = await client.channels.fetch(CHANNEL_ID);

    if (!channel) {
      console.log("channel not found");
      return;
    }

    console.log(`channel found: ${channel.name}`);

    await checkTwitch(client);

    setInterval(() => {
      checkTwitch(client).catch(console.error);
    }, 60_000);

  } catch (error) {
    console.error("startup error:", error);
    }
});

client.login(process.env.TOKEN);
console.log("TOKEN:", process.env.TOKEN);