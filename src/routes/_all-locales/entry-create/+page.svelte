<script>
  import { operationStore, mutation} from '@urql/svelte';
  import { mutationEntryCreate } from '$lib/graphql/mutations/entry-create.js'

  let variables;

  const entryCreateStore = operationStore(`${mutationEntryCreate}`);

  const entryCreateMutation = mutation(entryCreateStore);

  function entryCreate(variables) {
    entryCreateMutation(variables).then(result => {
      if (result.error) {
        console.log('ERROR:', result.error);
      }
    });
  }

  function handleSubmit(event) {
    variables = {
      titleEsu: event.target.titleEsu.value,
      entryEsu: event.target.entryEsu.value
    }
    entryCreate(variables);
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

{#if $entryCreateStore.data}
  <p>Your entry entitled "{$entryCreateStore.data.entryCreate.titleEsu}" was created.</p>
{:else if $entryCreateStore.error}
  <p>Error:  The entry was not created.  Please contact us.</p>
{/if}
