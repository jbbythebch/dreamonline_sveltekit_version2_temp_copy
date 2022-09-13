export function getUserEmail() {
  var userEmail;
  if (userEmail = localStorage.getItem('userEmail')) {
    return userEmail;
  } else {
    return null;
  }
}
