<script>
  import { onMount } from 'svelte';
  import { createOAuthClient } from '$lib/oauth';

  let client;

  // ブラウザでのみOAuthクライアントを初期化
  onMount(async () => {
    if (typeof window !== 'undefined') {
      client = await createOAuthClient();

      try {
        await client.signIn('suibari-cha.bsky.social', {
          state: 'some-state',
          prompt: 'none'
        });
      } catch (error) {
        console.error('Login failed', error);
      }
    }
  });
</script>

<h1>Logging in to Bluesky...</h1>
