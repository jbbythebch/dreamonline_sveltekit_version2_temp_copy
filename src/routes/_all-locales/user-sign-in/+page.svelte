<script>
  import { _ } from 'svelte-i18n';
  import { gql, getContextClient } from '@urql/svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { mutationUserSignIn } from '$lib/graphql/mutations/user-sign-in.js';
  import { userEmail } from '$lib/stores.js';
  import { setLocaleSettings, getStoredLocale } from '$lib/locales/i18n.js';

  // NOTE:  Using @urql/core, which is imported with @urql/svelte in 
  //        src/lib/client-utils/init-client.js, which is run in 
  //        src/routers/+layout.svelte, due to issues getting results 
  //        from mutationStore in current version of @urql/svelte,
  //        as of 2022-09-11.
  let client = getContextClient();

  const userSignIn = gql(mutationUserSignIn);

  let result;
  let variables;
  let userData;
  function handleSubmit(event) {
    variables = {
      email: event.target.email.value,
      password: event.target.password.value
    };

    client
      .mutation(userSignIn, variables)
      .toPromise()
      .then(result => {
        console.log(result);
        //debugger;
        userData = result.data
      });
    debugger;
  };
  console.log("----- userData: ", userData);

  function setUserState(userData) {
    localStorage.setItem('token', userData.token);
    //userEmail is saved to a store, for use throughout the app, including for 
    //  page protection, as noted in comments below
    $userEmail = userData.user.email;
    localStorage.setItem('userEmail', $userEmail);
    //The email cookie is only used to protect SvelteKit client pages. It is
    //  not used at all for user authentication at the API.
    //  The protection for client pages is to reduce calls to the API,
    //  by preventing any protected pages from loading if this cookie does
    //  not exist.
    //  The real authentication is done on the back end via the API using 
    //  the JWT in LocalStorage.
    //Related:  userEmail in localStorage is also used for page protection,
    //  since the hooks.js file does not run again after sign in, unless the
    //  page is manually refreshed.
    document.cookie = 'userEmail=' + $userEmail + '; SameSite=Lax';
    //$session = { 'userEmail': $userEmail }
    $page.data.userEmail = $userEmail
    console.log($page.data.userEmail);

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
  
<!--
  {#if $userSignIn.fetching}
    Loading...Error
  {:else if $userSignIn.error}
    <!- -
      TODO: need a lot of work for error handling, but this one will trigger
            when there's a 'Fail2Ban' type of lockout on API, among other errors
    - ->
    <br>
    <p>Failed login attempt.<br> 
    Something unusual went wrong.<br>
    Please try again later.<br>
    </p>
  {/if}

  {#if $userSignInStore.data}
    {#if $userSignInStore.data.userSignIn.errors.length > 0}
      {(console.log(
          'SIGN IN ERRORS ---->'
<!--
        ), ''
      )}
-->
<!--
      <br>
      <p>Failed login attempt.</p>
    {/if}
  {/if}
-->
