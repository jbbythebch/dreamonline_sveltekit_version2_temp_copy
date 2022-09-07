// 2022-09-07, JDB; do not need cookie handling in hooks.js at this time
//                  but leaving code as commented out for now, will delete
//                  it later
//
// import * as cookie from 'cookie';
// 
// export const handle = async ({ event, resolve }) => {
// 	const cookies = cookie.parse(event.request.headers.get('cookie') || '');
// 	event.locals.userid = cookies['userid'] || crypto.randomUUID();
// 
// 	const response = await resolve(event);
// 
// 	if (!cookies['userid']) {
// 		// if this is the first time the user has visited this app,
// 		// set a cookie so that we recognise them when they return
// 		response.headers.set(
// 			'set-cookie',
// 			cookie.serialize('userid', event.locals.userid, {
// 				path: '/',
// 				httpOnly: true
// 			})
// 		);
// 	}
// 
// 	return response;
// };
