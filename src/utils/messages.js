class Messages {
  constructor() {
    this.messages = [];
  }

  addMessage(channelInfo, text, userInfo, timestamp) {
    const message = {
      channel: {
        id: channelInfo.id,
        name: channelInfo.name
      },
      user: {
        id: userInfo.id,
        name: userInfo.profile.display_name,
        real_name: userInfo.real_name,
        avatar: userInfo.profile.image_32
      },
      text: text.substring(13),
      timestamp
    };
    this.messages.push(message);
    return message;
  }
  getMessages() {
    return this.messages;
  }
}

module.exports = { Messages };
