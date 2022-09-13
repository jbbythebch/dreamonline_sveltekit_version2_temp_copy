<script context="module">
  // turning off client side routing on this page forces a reload
  // on any subsequent pages navigated to from this page, so no 
  // data from one user is leaked to another when they sign in
  // without the previous user having signed out
  export const router = false;
</script>

<br>
<h1>You have signed in.</h1>
