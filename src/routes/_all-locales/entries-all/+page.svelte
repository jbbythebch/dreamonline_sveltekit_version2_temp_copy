<script>
  import { queryStore, gql, getContextClient } from '@urql/svelte';
  import { queryEntriesAll } from '$lib/graphql/queries/entries-all.js';

  const entries = queryStore({
    client: getContextClient(),
    query: gql(queryEntriesAll),
  });

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
