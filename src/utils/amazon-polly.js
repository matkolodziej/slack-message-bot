const aws = require("aws-sdk");
const stream = require("stream");
const speaker = require("speaker");

const VOICE = "Brian";
const SPEAKER_CONFIG = { channels: 1, bitDepth: 16, sampleRate: 16000 };

class Polly {
  constructor(region) {
    this._polly = new aws.Polly({
      region: region
    });
    this._voice = VOICE;
  }
  say(speech) {
    let utterance = { OutputFormat: "pcm", VoiceId: this._voice, Text: speech };

    this._polly.synthesizeSpeech(utterance, (err, data) => {
      if (!err && data && data.AudioStream instanceof Buffer) {
        let buffer = new stream.PassThrough();
        var player = new speaker(SPEAKER_CONFIG);

        buffer.end(data.AudioStream);
        buffer.pipe(player);
        player.on("finish", () => {
          buffer.unpipe(player);
          buffer.end();
          player.close();
        });
      }
    });
  }
}

module.exports = { Polly };
