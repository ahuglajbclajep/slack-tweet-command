// see https://github.com/cloudflare/workers-types/tree/v2.2.0#using-bindings
export declare global {
  const SLACK_SIGNING_SECRET: string;
  const SLACK_VERIFICATION_TOKEN: string;
  const TWITTER_CONSUMER_KEY: string;
  const TWITTER_CONSUMER_SECRET: string;
  const TWITTER_ACCESS_TOKEN: string;
  const TWITTER_ACCESS_SECRET: string;
}
