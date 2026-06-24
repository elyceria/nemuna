const {REST,Routes,SlashCommandBuilder} = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("teststream")
    .setDescription("hmm, i wonder if this thing is on?")
    .toJSON()
];

const rest = new REST({version: "10"}).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("initializing slash commands . . .");

    await rest.put(
      Routes.applicationGuildCommands("APP_ID", "GUILD_ID"),
      { body: commands }
    );

    console.log("slash commands initialized successfully ~");
  } catch (error) {
    console.error(error);
  }
})();