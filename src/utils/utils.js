const { TOKEN, OATH_TOKEN } = require("../config");
const { WebClient } = require("@slack/client");
const web = new WebClient(TOKEN);

const getChannelInfo = channelId => {
  return web.channels
    .info({ token: OATH_TOKEN, channel: channelId })
    .then(channelInfo => {
      return {
        id: channelInfo.channel.id,
        name: channelInfo.channel.name
      };
    });
};
const getUserInfo = userId => {
  return web.users.info({ token: OATH_TOKEN, user: userId }).then(userInfo => {
    return userInfo.user;
  });
};

module.exports = { getChannelInfo, getUserInfo };
