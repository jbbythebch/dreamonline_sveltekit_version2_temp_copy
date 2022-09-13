<script context="module">
  // This file contains 2 options for adding page protection to any page, by
  // adding one of the 2 options to the protected page's locale specific page.


  // OPTION 1
  // use this if no custom function is needed in 'load' for this page:
  export { pageProtection as load } from '$lib/auth/page-protection.js'
  

  // OPTION 2
  // use this if any custom functions are needed in 'load' for this page:
  import { pageProtection } from '$lib/auth/page-protection.js';
  export function load({ session }) {
    let pageProtectionResult = pageProtection({ session });
    if (pageProtectionResult.status) {
       return pageProtectionResult;
    }
  //for an authenticated user, add custom functions here:
    return { 
      status: 200
    };
  };
</script>
