<script>
  import { operationStore, mutation} from '@urql/svelte';
  import { mutationUserSignOut } from '$lib/graphql/mutations/user-sign-out.js';
  import { getToken } from '$lib/client-utils/get-token.js';
  import { getUserEmail } from '$lib/client-utils/get-user-email.js';
  import { getUserId } from '$lib/client-utils/get-user-id.js';
  import { goto } from '$app/navigation';
  import { userEmail } from '$lib/stores.js';

  const userSignOutStore = operationStore(`${mutationUserSignOut}`);

  const userSignOutMutation = mutation(userSignOutStore);

  function handleSubmit() {
    userApiSignOut();
    removeUserFromLocalStorage();
    removeUserFromStore();
    goto('user-signed-out');
  }

  function userApiSignOut() {
    userSignOutMutation().then(result => {
      if (result.error) {
        console.log('(other errors ---->)', result.error);
      } else {
        console.log('user has signed out of API');
      }
    });
  }

  function removeUserFromLocalStorage() {
    const token = getToken();
    const email = getUserEmail();
    const userId = getUserId();
    if (token !== null) {
      localStorage.removeItem('token');
    }
    if (email !== null) {
      localStorage.removeItem('userEmail');
    }
    if (userId !== null) {
      localStorage.removeItem('userId');
    }
  }

  function removeUserFromStore() {
    $userEmail.set(null);
  }
</script>

<br>
<form
    on:submit|preventDefault="{handleSubmit}"
>
  <button type="submit">Sign out</button>
</form>
