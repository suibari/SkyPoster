<script>
	import Alert from "./Alert.svelte";

  export let text;
  let showInfoAlert = false;
  let showErrorAlert = false;
  let messageAlert = "";

  async function handlePost() {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
      credentials: 'include'
    });

    if (response.ok) {
      showInfoAlert = true;
      messageAlert = "Successful to post!"
    } else {
      const error = await response.json();
      showErrorAlert = true;
      messageAlert = error;
    }
  }
</script>

<button class="bg-accent text-black py-2 px-4 rounded-lg" on:click={handlePost}>Post</button>

<Alert bind:showInfoAlert {messageAlert} />
<Alert bind:showErrorAlert {messageAlert} />