import { Agent } from "@atproto/api";
import { createClient } from "./oauth";
import { urlToDidWeb } from "@atproto/oauth-client-node";

export class OAuthAgent {
  constructor(did) {
    this.did = did;
  }

  async init() {
    const client = await createClient();
    this.oauthSession = await client.restore(this.did);
    this.agent = new Agent(this.oauthSession);
  }

  async post(text) {
    const postObj = {
      $type: 'app.bsky.feed.post',
      text,
    };
    return await this.agent.post(postObj);
  }

  async getProfile() {
    const params = { actor: this.did };
    const { data } = await this.agent.getProfile(params);
    return data;
  }

  async listNotifications() {
    const params = { limit : 10 };
    const { data } = await this.agent.listNotifications(params);

    // like, repost, reply, mention, quote の元をたどり、dataにセット
    // -> リプライ数に応じてかなり時間がかかる
    for (const notify of data.notifications) {
      console.log(notify)
      if ((notify.reason === 'like') || (notify.reason === 'repost') ||
          (notify.reason === 'mention') || (notify.reason === 'reply') || (notify.reason === 'quote')) {
        const uri = notify.reasonSubject;
        const record = await getRecords(uri);
        notify.record.parent = record;
      }
    }

    return data;
  }

  async getParentRecord(aturi) {
    const record = await getRecords(aturi);
    return record;
  }
}

async function getRecords(aturi) {
  const url = new URL('https://bsky.social/xrpc/com.atproto.repo.getRecord');

  const [repo, collection, rkey] = aturi.replace('at://', '').split('/');
  url.searchParams.append('repo', repo);
  url.searchParams.append('collection', collection);
  url.searchParams.append('rkey', rkey);

  try {
    const response = await fetch(url.href);
    const result = await response.json();
    if (!response.ok) {
      throw new Error('Network response is not ok');
    }
    return result;
  } catch (error) {
    throw error;
  }
}
