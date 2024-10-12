import { getIronSession } from 'iron-session';
import { COOKIE_SECRET } from '$env/static/private';
import { SessionStore } from '$lib/server/storage';
const sessionStore = new SessionStore();

export async function handle({ event, resolve }) {
  let sessionData;
  const response = new Response();

  // クライアントのリクエストからセッションID（クッキー）を取得
  const clientSession = await getIronSession(event.request, response, {
    cookieName: 'did',
    password: COOKIE_SECRET,
  });

  // クッキーにセッションIDが存在する場合
  if (clientSession.did) {
    // セッションIDを使ってSupabaseから完全なセッション情報を取得
    sessionData = await sessionStore.get(clientSession.did);

    if (!sessionData) {
      // セッションが無効な場合はクッキーをクリアする
      clientSession.destroy();
    } else {
      // セッション情報が有効な場合、リクエストにセッションデータを渡す(サーバで使いまわせる)
      // console.log("sessionData:", sessionData)
      event.locals.session = sessionData;
    }
  } else {
    // セッションIDがない場合はログインしていないとみなす
    event.locals.session = null;
  }

  // 次の処理へ進む
  const resolvedResponse = await resolve(event);

  // if (sessionData) {
  //   // クッキーを含むレスポンスヘッダーを設定
  //   resolvedResponse.headers.append('Set-Cookie', response.headers.get('set-cookie'));
  // }
  
  return resolvedResponse;
}
