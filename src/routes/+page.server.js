// hooks.server.js後、サーバ側でこの関数が実行され、ルートページアクセス時に認証結果をクライアントに渡す
// この次に+page.svelteが実行(レンダリング)される
export async function load({ locals }) {
  return {
    loggedIn: !!locals.session,
    user: locals.session ? locals.session.tokenSet.sub : null
  };
}
