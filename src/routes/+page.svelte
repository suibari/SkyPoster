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
