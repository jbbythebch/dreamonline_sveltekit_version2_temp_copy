<script>
  import { _ } from 'svelte-i18n';
</script>

<nav>
  <a href=".">Home</a>
  <a href="about">{$_('nav.top.about')}</a>
  <a href="user-sign-out">Sign Out</a>
  <a href="entry-create">Create Entry</a>
  <a href="entries-all">Show All Entries</a>
</nav>
