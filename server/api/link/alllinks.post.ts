import { z } from 'zod';

const bodySchema = z.object({
	folderId: z.string().uuid(),
});

export default defineEventHandler(async event => {
	const cookies = parseCookies(event);
	const body = await readValidatedBody(event, bodySchema.parse);

	if (!cookies.BookShookUser && !cookies.BookShookLogged) {
		return sendError(
			event,
			createError({
				statusMessage: 'you are unauthorized',
				statusCode: 401,
			}),
		);
	}

	const links = await event.context.prisma.link.findMany({
		where: {
			folderId: body.folderId,
		},
	});
	return links;
});
