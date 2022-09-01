<script>
  import { _ } from 'svelte-i18n';
</script>

<nav>
  <a href=".">Home</a>
  <a href="about">{$_('nav.top.about')}</a>
  <a href="user-sign-in">{$_('nav.top.signIn')}</a>
  <a href="user-register">{$_('nav.top.register')}</a>
</nav>
