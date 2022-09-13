<script>
  import { userEmailStore } from '$lib/stores.js';
</script>

{#if $userEmailStore }
  Signed in: {$userEmailStore}
{/if}

