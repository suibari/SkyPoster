<script>
	import '../app.css';
  import { onMount } from 'svelte';
	import { registerServiceWorker } from '$lib/notify';

	onMount(() => {
		registerServiceWorker();
	});
</script>

<slot></slot>
