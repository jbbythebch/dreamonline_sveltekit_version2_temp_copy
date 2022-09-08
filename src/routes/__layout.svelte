<script context="module">
  import { locale, waitLocale, isLoading } from 'svelte-i18n';

  export async function preload() {
    return waitLocale();
  }
</script>

<script>
  import { _ } from 'svelte-i18n';
  import {
    setUpI18n,
    setLocaleSettings,
    isLocaleLoaded,
    setBaseURL
  } from '$lib/locales/i18n.js';
  import { initializeClient } from '$lib/client-utils/init-client.js'; 
  import LocaleSwitcher from '$lib/locales/locale-switcher.svelte';
  import UserEmail from '$lib/users/user-email.svelte';
  import { userEmail } from '$lib/stores.js';
  import { getUserEmail } from '$lib/client-utils/get-user-email.js';
  import NavAuthenticated from '$lib/nav/nav-authenticated.svelte';
  import NavUnAuthenticated from '$lib/nav/nav-unauthenticated.svelte';
  import '../app.css';

  let hasLocaleChanged = false;

  setUpI18n();

  initializeClient();

  $: if ($isLocaleLoaded && !$isLoading) {
    setLocaleSettings($locale);
    localStorage.setItem('locale', $locale);
    document.title = $_('site.title');
    let email = '';
    if (email = getUserEmail())  {
      userEmail.set(email);
    }
    if (hasLocaleChanged) {
      let newBase = setBaseURL($locale);
      window.location.replace(newBase);
    }
  }
  
</script>

{#if $isLoading}
  <!-- TODO: maybe add a spinner or similar here instead of the below,
    which makes the site look 'jumpy', but might not even show up in production
  <br>
  <p>Please wait...loading.</p>
  -->
{:else}

  <br>

  <LocaleSwitcher bind:hasLocaleChanged />

  <UserEmail />

  {#if $userEmail}
    <NavAuthenticated />
  {:else}
    <NavUnAuthenticated />
  {/if}


  <slot></slot>
{/if}
