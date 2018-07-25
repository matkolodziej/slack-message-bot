#Slack Message Bot

<img src="https://i.imgur.com/HIwstWl.png" width="400" height="400">

## Info

Simple app that watches for messages that user is tagged on, displays and reads them in app.

## Libs used

SlackAPI - to be able to work with Slack.
AWS-SDK - Amazon Polly, text to speech.
Speaker
Stream
Moment - better date formatting.
MustacheJS - templating and formatting of html
NW - core of application.

## Installation

### api.slack

Create Bot on api.slack.com
Inside .src/config.js update credentials from api.slack.com
TOKEN - OAuth & Permissions > Bot User OAuth Access Token
OATH_TOKEN - OAuth & Permissions > OAuth Access Token
MENTIONED_USER - ID of a user tagged

Make sure your bot is online, add it to workspace and invite to channels via `/invite botName`

### application

```
npm install
```

If app crashes after speech do `npm install speaker --mpg123-backend=openal`

Make sure you have credentials in ~/.aws
Info: https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html

## Usage

```
npm start
```

### Tests

```
npm test
```
