import { userEmail } from '$lib/stores.js';

export function pageProtection() {
  if ($userEmail) {
    return {
      status: 302,
      redirect: `user-sign-in-auth-redirect`
    };
  }
  return {};
}
