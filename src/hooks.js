import * as cookie from 'cookie';
import { getCookie } from '$lib/client-utils/get-cookie.js';

export const handle = async ({ event, resolve }) => {
	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
	event.locals.userid = cookies['userid'] || crypto.randomUUID();

	const response = await resolve(event);

	if (!cookies['userid']) {
		// if this is the first time the user has visited this app,
		// set a cookie so that we recognise them when they return
		response.headers.set(
			'set-cookie',
			cookie.serialize('userid', event.locals.userid, {
				path: '/',
				httpOnly: true
			})
		);
	}

	return response;
};

export function getSession(request) {
  let all_cookies, userEmail;
  if (all_cookies = request.headers.cookie) {
    userEmail = getCookie(all_cookies, 'userEmail');
  }
  return  ( userEmail ? { userEmail: userEmail } : {} );
}
