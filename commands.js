const ELY_ID = "1308269381863739485";

module.exports = {
  name: "teststream",

  async execute(interaction) {
    if (interaction.user.id !== ELY_ID) {
      return interaction.reply({
        content: "hm? you aren't elyceria, so you can't use this command! ask her if you want to use it with a pretty please on top, okay?",
        ephemeral: true
      });
    }

    return interaction.reply("good morning elyceria ~  bot affirmative!");
  }
};

const { EmbedBuilder } = require("discord.js");

const ELY_ID = "1308269381863739485";

module.exports = {
  name: "teststream",

  async execute(interaction) {
    if (interaction.user.id !== ELY_ID) {
      return interaction.reply({
        content: "hm? you aren't elyceria, so you can't use this command! ask her if you want to use it with a pretty please on top, okay?",
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
        .setDescription("##  ♡ 　⊹ 　「 knock knock~ is this test message working? 」\n⸝⸝ 　 ﹕　 elyceria is NOT live __right now__ playing __${tw.game}__ *!*\n\n﹒　　come watch the NONstream on twitch [here](${tw.lin}) *!*")
        .setImage("https://i.ytimg.com/vi/sqMmUk69BVA/maxresdefault.jpg");

    return interaction.reply({
      embeds: [embed],
      allowedMentions: { parse: [] } // extra safety: prevents accidental pings
    });
  }
};