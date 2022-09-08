<script>
  import { operationStore, query } from '@urql/svelte';
  import { queryEntriesAll } from '$lib/graphql/queries/entries-all.js';

  const entries = operationStore(`${queryEntriesAll}`);

  query(entries);

</script>

<br>

{#if $entries.fetching}
  <p>Loading...</p>
{:else if $entries.error}
  <p>Oh no... {$entries.error.message}</p>
{:else}
  <p>The entries have loaded:</p>
<ul>
  {#each $entries.data.entriesAll as entry}
  <li>{entry.titleEsu}</li>
  {/each}
</ul>
{/if}
