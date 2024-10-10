import { PRIVATE_KEY } from '$env/static/private';
import { NodeOAuthClient } from '@atproto/oauth-client-node';
import { JoseKey } from '@atproto/jwk-jose';

export const client = new NodeOAuthClient({
  clientMetadata: {
    client_id: 'https://sky-poster.vercel.app/client-metadata.json', // あなたのURLに置き換えてください
    client_name: 'SkyPoster',
    client_uri: 'https://sky-poster.vercel.app',
    logo_uri: 'https://sky-poster.vercel.app',
    tos_uri: 'https://sky-poster.vercel.app',
    policy_uri: 'https://sky-poster.vercel.app',
    redirect_uris: ['https://sky-poster.vercel.app/api/callback'],
    grant_types: ['authorization_code', 'refresh_token'],
    response_types: ['code'],
    application_type: 'web',
    token_endpoint_auth_method: 'private_key_jwt',
    dpop_bound_access_tokens: false,
    jwks_uri: 'https://sky-poster.vercel.app/jwks.json',
    scope: 'atproto',
    token_endpoint_auth_signing_alg: 'RS256',
  },
  keyset: await Promise.all([
    JoseKey.fromImportable(PRIVATE_KEY),
  ]),

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
