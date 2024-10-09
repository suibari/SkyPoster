<script lang="ts">
  import { createOAuthClient } from '$lib/oauth';
  import { onMount } from 'svelte';

  let client;
  let error = '';

  // ページがロードされたらOAuthレスポンスを処理
  onMount(async () => {
    try {
      client = await createOAuthClient();

      // OAuthリダイレクトからのレスポンスを処理
      const queryParams = new URLSearchParams(window.location.search);
      await client.callback(queryParams);

      const result = await client.init();
      if (result && result.session) {
        console.log('User authenticated:', result.session.sub);
        // 認証後の処理をここで行う (例: ユーザーのホームページにリダイレクトなど)
      } else {
        console.log('No session found.');
      }
    } catch (err) {
      console.error('OAuth callback error', err);
      error = 'Error during authentication';
    }
  });
</script>

{#if error}
  <p>{error}</p>
{:else}
  <h1>Authentication in progress...</h1>
{/if}
