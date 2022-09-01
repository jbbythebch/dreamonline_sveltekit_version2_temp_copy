<script>
  import { userEmail } from '$lib/stores.js';
</script>

{#if $userEmail }
  Signed in: {$userEmail}
{/if}

