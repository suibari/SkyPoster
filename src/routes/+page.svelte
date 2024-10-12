<script>
  export let data;
  let authUrl = "";

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
      window.location.href = authUrl;
    } else {
      const error = await response.json();
      console.error('Login failed:', error);
    }
  }
</script>

{#if data.loggedIn}
  <h1>Welcome {data.user}!</h1>
  <!-- 投稿画面のコンテンツ -->
  <p>You can now create posts!</p>
{:else}
  <h1>Please log in</h1>
  <!-- ログインボタンやリンクを表示 -->
  <button on:click={login}>Login with Bluesky</button>
{/if}
