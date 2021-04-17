import Base64 from "crypto-js/enc-base64";
import hmacSHA1 from "crypto-js/hmac-sha1";
import OAuth from "oauth-1.0a";

type Config = {
  consumer_key: string;
  consumer_secret: string;
  access_token: string;
  access_token_secret: string;
};

export default class Twitter {
  private client: OAuth;
  private token: OAuth.Token;

  constructor(config: Config) {
    this.client = new OAuth({
      consumer: { key: config.consumer_key, secret: config.consumer_secret },
      signature_method: "HMAC-SHA1",
      hash_function: (base_string, key) =>
        Base64.stringify(hmacSHA1(base_string, key)),
    });

    this.token = {
      key: config.access_token,
      secret: config.access_token_secret,
    };
  }

  post(endpoint: string, params: Record<string, string>) {
    const url = `https://api.twitter.com/1.1/${endpoint}.json`;

    const headers: Record<string, any> = this.client.toHeader(
      this.client.authorize({ url, method: "POST", data: params }, this.token)
    );
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    headers.Accept = "application/json";

    // see https://developer.twitter.com/en/docs/authentication/oauth-1-0a/percent-encoding-parameters
    const body = `${new URLSearchParams(params)}`
      .replace(/%7E/g, "~")
      .replace(/\+/g, "%20")
      .replace(/\*/g, "%2A");

    return fetch(url, { method: "POST", headers, body }).then((response) => {
      if (!response.ok) throw new Error();
      return response.json();
    });
  }
}
