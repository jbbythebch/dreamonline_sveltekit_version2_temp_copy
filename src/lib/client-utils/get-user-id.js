export function getUserId() {
  var userId;
  if (userId = localStorage.getItem('userId')) {
    return userId;
  } else {
    return null;
  }
}
