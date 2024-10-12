<script context="module">
  export let loggedIn;
  export let user;
  let authUrl = "";

  export async function load({ locals }) {
    // hooks.server.ts で設定されたセッション情報を利用
    const session = locals.session;

    if (!session) {
      // セッションが存在しない場合、未ログイン状態
      loggedIn = false;
      return { loggedIn };
    }

    // セッションがある場合、ログイン済み
    loggedIn = true;
    return { loggedIn, user: session.user };
  }

  async function login() {
    const handle = 'suibari-cha.bsky.social'; // 適切なハンドルを指定

    // POST リクエストとして handle を送信
    const response = await fetch(`/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ handle })
    });

    if (response.ok) {
      authUrl = await response.json();
      console.log('Login successful:', authUrl);
    } else {
      const error = await response.json();
      console.error('Login failed:', error);
    }
  }
</script>

{#if loggedIn}
  <h1>Welcome {user.handle}!</h1>
  <!-- 投稿画面のコンテンツ -->
  <p>You can now create posts!</p>
{:else}
  <h1>Please log in</h1>
  <!-- ログインボタンやリンクを表示 -->
  <button on:click={login}>Login with Bluesky</button>
  {#if authUrl}
    <div>
      <a href={authUrl}>Try Oauth!</a>
    </div>
  {/if}
{/if}
