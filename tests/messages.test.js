const expect = require("chai").expect;
const { Messages } = require("../src/utils/messages");
const messages = new Messages();
const fakeMessage = {
  channel: {
    id: "ABASFSAE!211",
    name: "Some cool channel"
  },
  user: {
    id: "U@9189129",
    profile: {
      display_name: "some.name",
      image_32: "LINK TO AVATAR"
    },
    real_name: "Some Name"
  },
  text: "<U@9189129> text goes here",
  timestamp: "11:12 11-12-2018"
};
describe("messages", () => {
  it("should create new message and return it", () => {
    let newMessage = messages.addMessage(
      fakeMessage.channel,
      fakeMessage.text,
      fakeMessage.user,
      fakeMessage.timestamp
    );
    expect(newMessage.user.name).equal(fakeMessage.user.profile.display_name);
  });
  it("should get all messages", () => {
    messages.addMessage(
      fakeMessage.channel,
      fakeMessage.text,
      fakeMessage.user,
      fakeMessage.timestamp
    );
    expect(messages.getMessages().length).to.be.above(1);
  });
});
