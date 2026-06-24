const OWNER_ID = "YOUR_DISCORD_USER_ID";

module.exports = {
  name: "teststream",

  async execute(interaction) {
    if (interaction.user.id !== OWNER_ID) {
      return interaction.reply({
        content: "hm? you aren't elyceria, so you can't use this command! ask her if you want to use it with a pretty please on top, okay?",
        ephemeral: true
      });
    }

    return interaction.reply("good morning elyceria ~  bot affirmative!");
  }
};