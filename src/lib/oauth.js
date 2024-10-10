import { PRIVATE_KEY } from '$env/static/private';
import { NodeOAuthClient } from '@atproto/oauth-client-node';
import { JoseKey } from '@atproto/jwk-jose';

export const createClient = async (db) => {
  return new NodeOAuthClient({
    clientMetadata: {
      client_id: 'https://sky-poster.vercel.app/client-metadata.json', // あなたのURLに置き換えてください
      client_name: 'SkyPoster',
      client_uri: 'https://sky-poster.vercel.app',
      redirect_uris: ['https://sky-poster.vercel.app/api/callback'],
      grant_types: ['authorization_code', 'refresh_token'],
      response_types: ['code'],
      application_type: 'web',
      token_endpoint_auth_method: 'none',
      dpop_bound_access_tokens: true,
      scope: 'atproto',
    },
  
    stateStore: {
      async set(key, state) {
        // state保存処理
      },
      async get(key) {
        // state取得処理
      },
      async del(key) {
        // state削除処理
      },
    },
  
    sessionStore: {
      async set(sub, session) {
        // session保存処理
      },
      async get(sub) {
        // session取得処理
      },
      async del(sub) {
        // session削除処理
      },
    },
  
    // requestLock の実装も確認
    requestLock: async (key, fn) => {
      return await fn();
    },
  });  
}