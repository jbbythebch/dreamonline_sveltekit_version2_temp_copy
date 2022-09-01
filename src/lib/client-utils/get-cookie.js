export function getCookie(all_cookies, name) {
  var match = all_cookies.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
}
