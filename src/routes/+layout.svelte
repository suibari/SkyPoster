<script>
	import '../app.css';
  import { onMount } from 'svelte';
	import { registerServiceWorker } from '$lib/notify';
  import { PUBLIC_NODE_ENV } from '$env/static/public';

	onMount(() => {
		registerServiceWorker();
	});

  onMount(async () => {
    if (PUBLIC_NODE_ENV !== 'production') {
      const eruda = (await import('eruda')).default;
      eruda.init();
    }
  });
</script>

<slot></slot>
