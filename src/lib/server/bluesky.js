import { Agent } from "@atproto/api";
import { createClient } from "./oauth";

async function postWithOAuth(did) {
  // OAuth認証情報でagentをインスタンス
  const client = await createClient();
  const oauthSession = await client.restore(did);
  const agent = new Agent(oauthSession);

  const postObj = {
    $type: 'app.bsky.feed.post',
    text,
  }
  const result = await agent.post(postObj);
  if (result.error) {
    throw new Error(result)
  }

  return;
}