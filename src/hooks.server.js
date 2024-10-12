import { getIronSession } from 'iron-session';
import { COOKIE_SECRET } from '$env/static/private';
import { SessionStore } from '$lib/storage';
const sessionStore = new SessionStore();

export async function handle({ event, resolve }) {
  // クライアントのリクエストからセッションID（クッキー）を取得
  const clientSession = await getIronSession(event.request, resolve, {
    cookieName: 'did',
    password: COOKIE_SECRET,
  });

  // クッキーにセッションIDが存在する場合
  if (clientSession.did) {
    // セッションIDを使ってSupabaseから完全なセッション情報を取得
    const { data: sessionData, error } = sessionStore.get(clientSession.did);

    if (error || !sessionData) {
      // セッションが無効な場合はクッキーをクリアする
      clientSession.destroy();
    } else {
      // セッション情報が有効な場合、リクエストにセッションデータを渡す
      event.locals.session = JSON.parse(sessionData.session);
    }
  } else {
    // セッションIDがない場合はログインしていないとみなす
    event.locals.session = null;
  }

  // 次の処理へ進む
  const response = await resolve(event);
  
  return response;
}
