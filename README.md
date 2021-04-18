# slack-tweet-command

Add the `/tweet` command to your Slack workspace.

## Usage

- `/tweet message`  
  Tweet your message.
  The message will be posted correctly even if it contains line breaks or URLs.

## Install

### 1. Deploy to Cloudflare

```sh
$ git clone https://github.com/ahuglajbclajep/slack-tweet-command.git .
$ yarn
$ npx wrangler login
$ npx wrangler whoami
# enter the Account ID in the account_id field of wrangler.toml
$ yarn deploy
```

### 2. Apply for a twitter developer account

[Authentication](https://developer.twitter.com/en/docs/authentication/oauth-1-0a) is required to tweet from third party clients.

1. Apply for a developer account from [here](https://developer.twitter.com/en/apply-for-access)
2. [Create an app](https://developer.twitter.com/en/portal/apps/new)
3. Note down API Key, API Secret, Access Token and Access Secret

### 3. Create a Slack app

Go to the [your Slack apps page](https://api.slack.com/apps).

1. Create New App
   - Development Slack Workspace: select a workspace you want to install this app
2. Create New Slash Command
   - Request URL: Your Heroku application's URL
3. Note down Signing Secret

### 4. Set environment variables

```sh
$ npx wrangler secret put SLACK_SIGNING_SECRET    # enter the Slack Signing Secret
$ npx wrangler secret put TWITTER_CONSUMER_KEY    # enter the Twitter API Key
$ npx wrangler secret put TWITTER_CONSUMER_SECRET # enter the Twitter API Secret
$ npx wrangler secret put TWITTER_ACCESS_TOKEN    # enter the Twitter Access Token
$ npx wrangler secret put TWITTER_ACCESS_SECRET   # enter the Twitter Access Secret
```

## License

[MIT](LICENSE)
