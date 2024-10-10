// src/routes/api/atproto-oauth-callback.js
import { client } from '$lib/oauth';

export async function GET({ url }) {
  const params = new URLSearchParams(url.search);
  
  try {
    const { session, state } = await client.callback(params);
    console.log('User authenticated as:', session.did);
    // セッション情報を保存する処理を追加（例: データベースに保存）

    return {
      status: 200,
      body: { ok: true, session } // セッション情報を返す
    };
  } catch (err) {
    return {
      status: 500,
      body: { error: 'OAuth callback failed.' }
    };
  }
}
