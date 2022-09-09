<script>
  import { page } from '$app/stores';
</script>

<br>
<br>
Something has gone wrong.
<br>
<br>
<h1>{$page.status}: {$page.error.message}</h1>
