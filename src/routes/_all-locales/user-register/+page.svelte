<script>
  import { operationStore, mutation} from '@urql/svelte';
  import { mutationUserRegister } from '$lib/graphql/mutations/user-register.js'
  import { getStoredLocale } from '$lib/locales/i18n.js';

  var variables

  const userRegisterStore = operationStore(`${mutationUserRegister}`);

  const userRegisterMutation = mutation(userRegisterStore);

  function userRegister(variables) {
    userRegisterMutation(variables).then(result => {
      if (result.error) {
        console.log('ERROR:', result.error);
      }
    });
  }

  function handleSubmit(event) {
    let currentLocale = getStoredLocale();
    variables = {
      email: event.target.email.value,
      password: event.target.password.value,
      localeCode: currentLocale
    }
    userRegister(variables);
  }
</script>

<form
    on:submit|preventDefault="{handleSubmit}"
>
  <label for="email">Email</label>
  <input required type="email" id="email"/>
  <br>
  <label for="password">Password</label>
  <input required type="password" id="password"/>

  <br>
  <br>
  <button type="submit">Register User</button>
</form>

{#if $userRegisterStore.data}
  <p>User {$userRegisterStore.data.userRegister.email} has registered.</p>
{:else if $userRegisterStore.error}
  <p>Error:  The user was not created.  Please contact us.</p>
{/if}
