import { getIronSession } from 'iron-session';
import { COOKIE_SECRET } from '$env/static/private'; // 環境変数をインポート
import { createClient } from '$lib/server/oauth'; // OAuthクライアントをインポート

export async function GET({ url, request }) {
  const response = new Response();
  const params = new URLSearchParams(url.search); // URLからクエリパラメータを取得
  try {
    const client = await createClient();
    const { session } = await client.callback(params); // OAuthのコールバック処理

    // セッション管理
    const clientSession = await getIronSession(request, response, {
      cookieName: 'did',
      password: COOKIE_SECRET,
    });

    if (clientSession.did && clientSession.did !== session.sub) {
      throw new Error('session already exists for another user');
    }
    
    clientSession.did = session.sub; // セッションにdidを保存
    await clientSession.save(); // セッションを保存

    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/',
        'Set-Cookie': response.headers.get('set-cookie') // セッション情報を含むクッキーをレスポンスに設定
      }
    });

  } catch (err) {
    console.error('OAuth callback failed:', err); // エラーログ

    // エラー時のリダイレクト
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/?error=oauth_failed'
      }
    });
  }
}
