import { App } from "@slack/bolt";
import Twit from "twit";

const twit = new Twit({
  consumer_key: process.env.TWITTER_API_KEY!,
  consumer_secret: process.env.TWITTER_API_SECRET!,
  access_token: process.env.TWITTER_ACCESS_TOKEN!,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET!
});
const tweet = (text: string) => twit.post("statuses/update", { status: text });

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
    await tweet(command.text);
  } catch {
    respond(error("Sorry, something went wrong."));
  }
});

app.start(process.env.PORT);
