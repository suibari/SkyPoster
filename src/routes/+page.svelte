<script>
  let showAuthUrl = false;
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
      showAuthUrl = true;
      authUrl = await response.json();
      console.log('Login successful:', authUrl);
    } else {
      const error = await response.json();
      console.error('Login failed:', error);
    }
  }
</script>

<button on:click={login}>Login with Bluesky</button>
{#if showAuthUrl}
  <div>
    <a href={authUrl}>Try Oauth!</a>
  </div>
{/if}