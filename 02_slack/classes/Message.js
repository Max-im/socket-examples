class Message {
  constructor(text, avatar, username) {
    this.text = text;
    this.time = Date.now();
    this.avatar = avatar;
    this.username = username;
  }
}

module.exports = Message;
