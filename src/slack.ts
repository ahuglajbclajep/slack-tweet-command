import Hex from "crypto-js/enc-hex";
import hmacSHA256 from "crypto-js/hmac-sha256";

// see https://api.slack.com/authentication/verifying-requests-from-slack
function verify(headers: Headers, body: string): boolean {
  const timestamp = headers.get("X-Slack-Request-Timestamp");
  const baseString = `v0:${timestamp}:${body}`;
  const signature = Hex.stringify(hmacSHA256(baseString, SLACK_SIGNING_SECRET));
  return `v0=${signature}` === headers.get("X-Slack-Signature");
}

function errorMessage(text: string): object {
  return {
    response_type: "ephemeral",
    text: "",
    attachments: [{ color: "danger", text }],
  };
}

export { verify, errorMessage };
