export function pageProtection({ session }) {
  if (!session.userEmail) {
    return {
      status: 302,
      redirect: `user-sign-in-auth-redirect`
    };
  }
  return {};
}
