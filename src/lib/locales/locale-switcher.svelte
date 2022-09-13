<script>
  import { locale } from 'svelte-i18n';
  import { localesSettings } from '$lib/locales/i18n.js';

  const localesSettingsArray = Object.entries(localesSettings);
  export let hasLocaleChanged;
</script>

<style>
  .choose-locale {
    display: flex;
  }

  .select {
    margin: 0 1rem 1rem;
  }
</style>

<div class="choose-locale">
  <div class="select">
    <select bind:value={$locale} on:change={() => hasLocaleChanged = true}>
      {#each localesSettingsArray as localeOption}
        <option value="{localeOption[0]}">
          {localeOption[1]["localeDesc"]}
        </option>
      {/each}
    </select>
  </div>
</div>
