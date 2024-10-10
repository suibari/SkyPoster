<!-- src/routes/+page.svelte -->
<script>
  async function login() {
    const handle = 'suibari-cha.bsky.social'; // 適切なハンドルを指定
    await fetch(`/api/login?handle=${handle}`);
  }
</script>

<button on:click={login}>Login with Bluesky</button>
