import { userEmailStore } from '$lib/stores.js';

export function pageProtection() {
  if ($userEmailStore) {
    return {
      status: 302,
      redirect: `user-sign-in-auth-redirect`
    };
  }
  return {};
}
