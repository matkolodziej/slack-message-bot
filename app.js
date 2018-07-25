const path = require("path");
const moment = require("moment");
const mustache = require("mustache");
const { TOKEN, MENTIONED_USER } = require(path.join(
  global.__dirname,
  "./src/config"
));
const { RTMClient } = require("@slack/client");
const { Messages } = require(path.join(
  global.__dirname,
  "./src/utils/messages"
));
const { getChannelInfo, getUserInfo } = require(path.join(
  global.__dirname,
  "./src/utils/utils"
));
const { Polly } = require(path.join(
  global.__dirname,
  "./src/utils/amazon-polly"
));
const rtm = new RTMClient(TOKEN);
const messages = new Messages();
const polly = new Polly("eu-west-3");

rtm.start();

rtm.on("message", event => {
  let userTagged = event.text
    .split("<@")
    .pop()
    .split(">")
    .shift();
  if (userTagged === MENTIONED_USER) {
    getUserInfo(MENTIONED_USER)
      .then(user => {
        getChannelInfo(event.channel)
          .then(channel => {
            const message = messages.addMessage(
              channel,
              event.text,
              user,
              moment.unix(event.ts).format("HH:mm DD-MM-YYYY")
            );
            new Notification(`#${message.channel.name}`, {
              body: message.text
            });
            polly.say(message.text);
            renderMessage(message);
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
});

function renderMessage(message) {
  let messagesUl = document.getElementById("messages");
  let template = document.getElementById("message-template").innerHTML;

  let html = mustache.render(template, {
    user: message.user.name,
    timestamp: message.timestamp,
    channel: message.channel.name,
    text: message.text,
    avatar: message.user.avatar
  });

  messagesUl.innerHTML += html;

  scrollToBottom();
}
function scrollToBottom() {
  let height = document.querySelector(".container").scrollHeight;
  window.scroll({
    top: height,
    behavior: "smooth"
  });
}
