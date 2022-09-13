<script>
  import { gql, getContextClient } from '@urql/svelte';
  import { mutationEntryCreate } from '$lib/graphql/mutations/entry-create.js'
  import { entryCreateResultStore } from '$lib/stores';

  let client = getContextClient();
  let variables;

  function handleSubmit(event) {
    variables = {
      titleEsu: event.target.titleEsu.value,
      entryEsu: event.target.entryEsu.value
    }
    createEntry(variables);
  }

  function createEntry(variables) {
    client
      .mutation(gql(mutationEntryCreate), variables)
      .toPromise()
      .then(result => {
        $entryCreateResultStore = result;
        if (result.error) {
          console.log('ERROR:', result.error);
        }
    });
  }

</script>

<br>
<form
    on:submit|preventDefault="{handleSubmit}"
>
  <label for="titleEsu">Title</label>
  <input required id="titleEsu"/>
<br>
  <label for="entryEsu">Entry</label>
  <input required id="entryEsu"/>

<br>
<br>
  <button type="submit">Create Entry</button>
</form>

{#if $entryCreateResultStore.data}
  <p>Your entry entitled "{$entryCreateResultStore.data.entryCreate.titleEsu}" was created.</p>
{:else if $entryCreateResultStore.error}
  <p>Error:  The entry was not created.  Please contact us.</p>
{/if}
