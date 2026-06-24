function streamEmbed(stream, streamer) {
  return {
    description:
      `**${streamer} is live playing ${stream.game}**\n\n` +
      `come watch the stream[here!](${stream.url})`,

    image: {
      url: stream.thumbnail
    },

    color: 0x9146ff
  };
}

function elysEmbed(stream) {
  return {
    description:
      `##  ♡ 　⊹ 　「 *${stream.title}* 」\n⸝⸝ 　 ﹕　 elyceria is live __right now__ playing __${stream.game}__\n\n﹒come watch the stream on twitch [here](${stream.url}) *!*`,
    image: {
      url: stream.thumbnail
    },

    color: 0xff4da6
  };
}

function buildEmbed(stream, streamer) {
  if (streamer === "elyceria") {
    return elysEmbed(stream);
  }

  return streamEmbed(stream, streamer);
}

function sendTwitchLive(channel, stream, streamer) {
  const embed = buildEmbed(stream, streamer);

  const content =
    streamer === "elyceria"
      ? "<@&1368516372228734996>"
      : null;

  return channel.send({
    content,
    embeds: [embed]
  });
}

module.exports = {
  sendTwitchLive
};