import Tweet from "./tweet";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request) {
  const params: Record<string, string> = [
    ...new URLSearchParams(await request.text()).entries(),
  ].reduce((ps, [k, v]) => ({ ...ps, [k]: v }), {});

  // TODO: verifying signatures

  const tweet = new Tweet({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_SECRET,
  });
  try {
    await tweet.post("statuses/update", { status: params.text });
  } catch {
    return new Response(errorJSON("Sorry, something went wrong."), {
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response();
}

const errorJSON = (text: string) =>
  JSON.stringify({
    response_type: "ephemeral",
    text: "",
    attachments: [{ color: "danger", text }],
  });
