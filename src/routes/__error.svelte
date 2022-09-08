<script context="module">
  export const load = ({ error, status }) => {
    return {
      props: {
        error,
        status,
      },
    };
  };
</script>

<script>
  export let error;
  export let status;
</script>

<br>
<h1>Something has gone wrong!</h1>
<br>
<h1>{error.name} {status}</h1>
<br>
<p>{error.message}</p>
<br>
<p>Please select an option from the navigation bar.</p>
