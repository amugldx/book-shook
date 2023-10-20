export default defineEventHandler(async event => {
	const cookies = parseCookies(event);

	if (cookies.BookShookUser || cookies.BookShookTest) {
		deleteCookie(event, 'BookShookUser');
		deleteCookie(event, 'BookShookLogged');
		deleteCookie(event, 'BookShookTest');
		return true;
	} else {
		return sendError(
			event,
			createError({
				statusMessage: 'you are unauthorized',
				statusCode: 401,
			}),
		);
	}
});
