import { Agent } from "@atproto/api";
import { createClient } from "./oauth";

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
    const params = { limit : 25 };
    const { data } = await this.agent.listNotifications(params);

    // like, repost, reply, mention, quote の元をたどり、dataにセット
    const aturis = [];
    for (const notify of data.notifications) {
      if ((notify.reason === 'like') || (notify.reason === 'repost') ||
          (notify.reason === 'mention') || (notify.reason === 'reply') || (notify.reason === 'quote')) {
        aturis.push(notify.reasonSubject);
      }
    }
    const posts = await getPosts(aturis);
    for (const post of posts) {
      const match = data.notifications.find(notify => notify.reasonSubject === post.uri);
      if (match) {
        match.parent = post;
      }
    }

    return data;
  }

  async updateSeen() {
    const url = new URL('https://public.api.bsky.app/xrpc/app.bsky.notification.updateSeen');
  
    const seenAt = new Date().toISOString();
    
    const response = await fetch(url.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seenAt })
    });
    if (!response.ok) {
      throw new Error('Network response is not ok');
    }
    return;
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

async function getPosts(aturis) {
  const url = new URL('https://public.api.bsky.app/xrpc/app.bsky.feed.getPosts');

  aturis.forEach(uri => {
    url.searchParams.append('uris', uri);
  });

  try {
    const response = await fetch(url.href);
    if (!response.ok) {
      throw new Error('Network response is not ok');
    }

    const {posts} = await response.json();
    return posts;
  } catch (error) {
    throw error;
  }
}
