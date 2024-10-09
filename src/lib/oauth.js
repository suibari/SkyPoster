import { BrowserOAuthClient, AtprotoDohHandleResolver } from '@atproto/oauth-client-browser';

export async function createOAuthClient() {
  const client = await BrowserOAuthClient.load({
    clientId: 'https://skyposter.vercel.app/client-metadata-dev.json',
    handleResolver: 'https://bsky.social',  // デフォルトのハンドルリゾルバーを使用
    // 必要に応じて他のオプションを追加
  });

  return client;
}
