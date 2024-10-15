<script>
	import '../app.css';
  import { onMount } from 'svelte';
	import { registerPushNotifications } from '$lib/notify';

	onMount(() => {
		registerPushNotifications();
	});
</script>

<slot></slot>
