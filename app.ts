import { App } from "@slack/bolt";
import Tweet from "./tweet";

const tweet = new Tweet({
  consumer_key: process.env.TWITTER_API_KEY!,
  consumer_secret: process.env.TWITTER_API_SECRET!,
  access_token: process.env.TWITTER_ACCESS_TOKEN!,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET!
});

const error = (text: string) => ({
  response_type: "ephemeral" as const,
  text: "",
  attachments: [{ color: "danger", text }]
});

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
  endpoints: { commands: "/" }
});

app.command("/tweet", async ({ command, ack, respond }) => {
  ack();
  try {
    await tweet.post("statuses/update", { status: command.text });
  } catch {
    respond(error("Sorry, something went wrong."));
  }
});

app.start(process.env.PORT);
