<script>
  import { _ } from 'svelte-i18n';
  import { gql, getContextClient } from '@urql/svelte';
  import { userSignInResultStore, userEmailStore } from '$lib/stores';
  import { goto } from '$app/navigation';
  import { mutationUserSignIn } from '$lib/graphql/mutations/user-sign-in.js';
  import { setLocaleSettings, getStoredLocale } from '$lib/locales/i18n.js';

  let client = getContextClient();
  let variables;

  function handleSubmit(event) {
    variables = {
      email: event.target.email.value,
      password: event.target.password.value
    };
    signInUser();
  };

  function signInUser() {
    client
      .mutation(gql(mutationUserSignIn), variables)
      .toPromise()
      .then(result => {
        $userSignInResultStore = result;
        if (result.error) {
          console.log('(other errors ---->)', result.error);
        } else if (result.data.userSignIn.errors[0]) {
          console.log(
            '(sign in error ---->)',
            result.data.userSignIn.errors[0].message
          );
        } else {
          setUserState(result.data.userSignIn);
        }
      });
  }

  function setUserState(userData) {
    localStorage.setItem('token', userData.token);
    //userEmail is saved to a store, for use throughout the app, including for 
    //  page protection, as noted in comments below
    //$userEmailStore is only used to protect SvelteKit client pages.
    //  It is not used at all for user authentication at the API.
    //  The protection for client pages is just to reduce calls to the API,
    //  by preventing any protected pages from loading if this value does
    //  not exist.  (This is not expected to stop intelligent, malicious 
    //  attacks, just to reduce some types of attacks.)
    //  The real authentication is done on the back end via the API using 
    //  the JWT in LocalStorage.
    $userEmailStore = userData.user.email;
    localStorage.setItem('userEmail', $userEmailStore);

    let currentLocale = getStoredLocale();
    let userLocale = userData.user.locale.localeCode;
    if (currentLocale != userLocale) {
      localStorage.setItem('locale', userLocale);
      setLocaleSettings(userLocale);
      // using 'replace' so it reloads the page, and resets the locale switcher
      window.location.replace(`/${userLocale}/user-signed-in`);
    } else {
      goto('user-signed-in');
    }
  }
</script>

<br>
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
  <button type="submit">{$_('buttonsSubmit.signIn')}</button>
</form>
  
  {#if $userSignInResultStore.error}
    <!--
    TODO: need a lot of work for error handling, but this one will trigger
          when there's a 'Fail2Ban' type of lockout on API, among other errors
    -->
    <br>
    <p>Failed login attempt.<br> 
    Something unusual went wrong.<br>
    Please try again later.<br>
    </p>
  {/if}

  {#if $userSignInResultStore.data}
    {#if $userSignInResultStore.data.userSignIn.errors.length > 0}
      {(console.log(
          'SIGN IN ERRORS ---->', $userSignInResultStore.data.userSignIn.errors
        ), ''
      )}
      <br>
      <p>Failed login attempt.</p>
    {/if}
  {/if}
