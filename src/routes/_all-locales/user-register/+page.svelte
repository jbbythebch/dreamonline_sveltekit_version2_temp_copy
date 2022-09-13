<script>
  import { gql, getContextClient } from '@urql/svelte';
  import { userRegisterResultStore, userEmailStore } from '$lib/stores';
  import { mutationUserRegister } from '$lib/graphql/mutations/user-register.js'
  import { getStoredLocale } from '$lib/locales/i18n.js';

  let client = getContextClient();
  let variables;

  function handleSubmit(event) {
    let currentLocale = getStoredLocale();
    variables = {
      email: event.target.email.value,
      password: event.target.password.value,
      localeCode: currentLocale
    }
    registerUser(variables);
  }

  function registerUser(variables) {
    client
      .mutation(gql(mutationUserRegister), variables)
      .toPromise()
      .then(result => {
        $userRegisterResultStore = result;
         if (result.error) {
           console.log('ERROR:', result.error);
         }
      });
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

{#if $userRegisterResultStore.data}
  <p>User {$userRegisterResultStore.data.userRegister.email} has registered.</p>
{:else if $userRegisterResultStore.error}
  <p>Error:  The user was not created.  Please contact us.</p>
{/if}
