export default defineEventHandler(async event => {
	const cookies = parseCookies(event);

	if (!cookies.BookShookUser && !cookies.BookShookLogged) {
		return sendError(
			event,
			createError({
				statusMessage: 'you are unauthorized',
				statusCode: 401,
			}),
		);
	}

	const folders = await event.context.prisma.folder.findMany();
	return folders;
});
