import { errorMessage, verify } from "./slack";
import Twitter from "./twitter";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request) {
  // CAUTION: request body can be got only once
  const body = await request.text();
  if (!verify(request.headers, body)) return new Response("", { status: 403 });

  const params: Record<string, string> = [
    ...new URLSearchParams(body).entries(),
  ].reduce((ps, [k, v]) => ({ ...ps, [k]: v }), {});
  const twitter = new Twitter({
    consumer_key: TWITTER_CONSUMER_KEY,
    consumer_secret: TWITTER_CONSUMER_SECRET,
    access_token: TWITTER_ACCESS_TOKEN,
    access_token_secret: TWITTER_ACCESS_SECRET,
  });
  try {
    await twitter.post("statuses/update", { status: params.text });
  } catch {
    return new Response(
      JSON.stringify(errorMessage("Sorry, something went wrong.")),
      { headers: { "Content-Type": "application/json" } }
    );
  }
  return new Response();
}
