import Hex from "crypto-js/enc-hex";
import hmacSHA256 from "crypto-js/hmac-sha256";

// see https://api.slack.com/authentication/verifying-requests-from-slack
async function verify(request: Request): Promise<boolean> {
  const timestamp = request.headers.get("X-Slack-Request-Timestamp");
  const baseString = `v0:${timestamp}:${await request.text()}`;
  const signature = Hex.stringify(hmacSHA256(baseString, SLACK_SIGNING_SECRET));
  return `v0=${signature}` === request.headers.get("X-Slack-Signature");
}

function errorMessage(text: string): object {
  return {
    response_type: "ephemeral",
    text: "",
    attachments: [{ color: "danger", text }],
  };
}

export { verify, errorMessage };
