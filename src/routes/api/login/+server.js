// src/routes/api/login/+server.js
import { createClient } from '$lib/oauth'; // lib/oauth.jsからOAuthクライアントをインポート

export async function POST({ request }) {
  try {
    // リクエストボディを取得
    const { handle } = await request.json();

    // OAuthの処理を行う
    const response = await createClient();

    // 成功した場合、Responseオブジェクトを返す
    return new Response(JSON.stringify(response), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    // エラーメッセージをレスポンスに返す
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
