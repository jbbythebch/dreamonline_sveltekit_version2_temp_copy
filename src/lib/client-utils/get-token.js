export function getToken() {
  var token;
  if (token = localStorage.getItem('token')) {
    return token;
  } else {
    return null;
  }
}
