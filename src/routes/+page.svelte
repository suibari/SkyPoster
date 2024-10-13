<script>
  import { Alert } from "flowbite-svelte";
	import LoginForm from "../components/LoginForm.svelte";
  import MainForm from "../components/MainForm.svelte";

  export let data;
</script>

{#if data.loggedIn}
  <MainForm />
{:else}
  <LoginForm />
{/if}

<div class="fixed bottom-0 justify-center">
  <Alert color="red">
    <span class="font-medium z-50">Info alert!</span>
    Change a few things up and try submitting again.
  </Alert>
</div>