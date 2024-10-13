import { Agent } from "@atproto/api";
import { createClient } from "./oauth";

export async function postWithOAuth(did, text) {
  try {
    // OAuth認証情報でagentをインスタンス
    const client = await createClient();
    const oauthSession = await client.restore(did);
    const agent = new Agent(oauthSession);

    const postObj = {
      $type: 'app.bsky.feed.post',
      text,
    }
    const result = await agent.post(postObj);
  } catch (error) {
    throw error;
  }

  return;
}