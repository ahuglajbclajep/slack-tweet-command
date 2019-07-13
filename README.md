# slack-tweet-command

Add a `/tweet` command to your workspace.

## Usage

- `/tweet message`  
  Tweet a message.
  A message will be posted correctly even if they contain line breaks or URLs.

## Install

### Apply for a twitter developer account

[User authentication](https://developer.twitter.com/en/docs/basics/authentication/overview/oauth) is required to tweet from third party clients.
Apply for a developer account from [here](https://developer.twitter.com), and [create an application](https://developer.twitter.com/en/apps/create).
_API key_, _API secret key_, _Access token_, _Access token secret_ can be obtained.

### Create a Heroku application

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Create a Slack application

Go to the [your Slack Apps web page](https://api.slack.com/apps).

1. _Create New app_.
2. Setup application.

- _App Name_: As you like.
- _Development Slack Workspace_: Select a workspace you want to install this app.

3. _Create App_.

### Create a Bot User

[Create a Bot User](https://slack.dev/bolt/tutorial/getting-started#tokens-and-installing-apps) for _Bot User OAuth Access Token_.

### Create a Slash Command

In the new application page:

1. Select _Slack Commands_ from _Features_ menu.
2. _Create New Command_.
3. Setup new command.

- _Command_: /tweet
- _Request URL_: Your Heroku application's URL.
- _Short Description_: e.g. "Tweet a message".
- _Usage Hint_: e.g. "message".

4. _Save_.

### Setup environment variables

In the application page:

1. Select _Basic Information_ from _Settings_ menu.
2. Note down _Signing Secret_.
3. Select _OAuth & Permissions_ from _Features_ menu.
4. Note down _Bot User OAuth Access Token_.

In the Twitter application's details page:

5. Select _Keys and tokens_ tab.
6. Note down _API key_, _API secret key_, _Access token_, _Access token secret_.

In the Heroku application's settings page:

7. Select _Reveal Config Vars_.
8. Add _Signing Secret_ as _SLACK_SIGNING_SECRET_.
9. Add _Bot User OAuth Access Token_ as _SLACK_BOT_TOKEN_.
10. Add _API key_ as _TWITTER_API_KEY_.
11. Add _API secret key_ as _TWITTER_API_SECRET_.
12. Add _Access token_ as _TWITTER_ACCESS_TOKEN_.
13. Add _Access token secret_ as _TWITTER_ACCESS_SECRET_.

## License

[MIT](LICENSE)
