<script>
  let handle = "";
  let authUrl = "";

  async function handleLogin() {
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

<div class="flex justify-center items-center h-screen">
  <div class="text-center">
    <!-- タイトル -->
    <h1 class="text-8xl font-bold mb-8 text-primary" style="font-family: 'Comic Sans MS', cursive, sans-serif;">SkyPoster</h1>
    
    <!-- 説明テキスト -->
    <p class="text-md mb-8">SkyPoster is a simple Bluesky client app.<br>
      If you don't have time to look at your timeline, but want to post, check replies, and reply?<br>
      This app may support you.<br>
      Let's log-in to input your handle!
    </p>
    
    <!-- ハンドル入力 -->
    <input type="text" placeholder="handle.bsky.social" bind:value={handle} class="w-64 p-2 border border-gray-300 rounded-lg mb-4">
    
    <!-- ログインボタン -->
    <button on:click={handleLogin} class="bg-accent text-gray-900 py-2 px-4 rounded-lg">Log-In</button>
  </div>
</div>

<style>
  /* ポップな感じのスタイルを追加する場合、色などを調整 */
</style>
