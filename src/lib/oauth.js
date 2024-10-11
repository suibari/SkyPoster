import { PUBLIC_URL } from '$env/static/private';
import { NodeOAuthClient } from '@atproto/oauth-client-node';
import { SessionStore, StateStore } from './storage';

let client;

export const createClient = async (db) => {
  const url = PUBLIC_URL || `http://127.0.0.1:7860`;
  const enc = encodeURIComponent;

  if (!client) {
    client = new NodeOAuthClient({
      clientMetadata: {
        client_id: PUBLIC_URL ?
          `${url}/client-metadata.json` :
          `http://localhost?redirect_uri=${enc(`${url}/api/callback`)}&scope=${enc('atproto')}`,
        client_name: 'SkyPoster',
        client_uri: url,
        redirect_uris: [`${url}/api/callback`],
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

  return client;
}