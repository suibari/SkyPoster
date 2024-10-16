<script>
	import '../app.css';
  import { onMount } from 'svelte';
	import { registerServiceWorker } from '$lib/notify';
  import { PUBLIC_NODE_ENV } from '$env/static/public';
  import eruda from 'eruda';

	onMount(() => {
		registerServiceWorker();
	});

  if (PUBLIC_NODE_ENV !== 'production') {
    eruda.init();
  }
</script>

<slot></slot>
