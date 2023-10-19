export default defineEventHandler(async event => {
	const cookies = await parseCookies(event);

	if (cookies.BookShookUser) {
		deleteCookie(event, 'BookShookUser');
		deleteCookie(event, 'BookShookLogged');
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
