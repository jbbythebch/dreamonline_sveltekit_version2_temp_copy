<script>
  import { _ } from 'svelte-i18n';
  import { gql, getContextClient } from '@urql/svelte';
  import { mutationUserSignOut } from '$lib/graphql/mutations/user-sign-out.js';
  import { userEmail } from '$lib/stores.js';
  import { getUserEmail } from '$lib/client-utils/get-user-email.js';
  import { getToken } from '$lib/client-utils/get-token.js';
  import { goto } from '$app/navigation';

  let client = getContextClient();

  function handleSubmit() {
    userApiSignOut();
    removeUserFromLocalStorage();
    removeUserFromStore();
    goto('user-signed-out');
  }

  function userApiSignOut() {
    client
      .mutation(gql(mutationUserSignOut))
      .toPromise()
      .then(result => {
        if (result.error) {
          console.log('(other errors ---->)', result.error);
        } else {
          console.log('user has signed out of API');
        }
      });
  }

  function removeUserFromLocalStorage() {
    const userEmail = getUserEmail();
    const token = getToken();
    if (token !== null) {
      localStorage.removeItem('token');
    }
    if (userEmail !== null) {
      localStorage.removeItem('userEmail');
    }
  }

  function removeUserFromStore() {
    $userEmail = null;
  }
</script>

<br>
<form
    on:submit|preventDefault="{handleSubmit}"
>
  <button type="submit">Sign out</button>
</form>
