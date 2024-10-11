import { getIronSession } from 'iron-session';
import { COOKIE_SECRET } from '$env/static/private'; // 環境変数をインポート
import { createClient } from '$lib/oauth'; // OAuthクライアントをインポート

export async function GET({ url, request }) {
  const params = new URLSearchParams(url.search); // URLからクエリパラメータを取得
  try {
    const client = await createClient();
    const { session } = await client.callback(params); // OAuthのコールバック処理

    // セッション管理
    const clientSession = await getIronSession(request, {
      cookieName: 'sid',
      password: COOKIE_SECRET,
    });

    if (clientSession.did) {
      throw new Error('session already exists');
    }
    
    clientSession.did = session.did; // セッションにdidを保存
    await clientSession.save(); // セッションを保存

  } catch (err) {
    console.error({ err }, 'oauth callback failed'); // エラーログ
    return Response.redirect(new URL('/?error', url), 302); // エラー時にリダイレクト
  }

  return Response.redirect(new URL('/', url), 302); // 成功時にリダイレクト
}
