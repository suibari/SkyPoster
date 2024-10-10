import { client } from '$lib/oauth'; // lib/oauth.jsからOAuthクライアントをインポート

export async function POST({ request }) {
  try {
    // OAuthの処理を行う
    const response = await client.handleAuthRequest(request);

    // 成功した場合、Responseオブジェクトを返す
    return new Response(JSON.stringify(response), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    // エラーメッセージをレスポンスに返す
    return new Response(JSON.stringify({ error: error.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}
