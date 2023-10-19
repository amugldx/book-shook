import { z } from 'zod';

const bodySchema = z.object({
	id: z.string().uuid(),
});

export default defineEventHandler(async event => {
	const body = await readValidatedBody(event, bodySchema.parse);
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

	await event.context.prisma.folder.delete({
		where: {
			id: body.id,
		},
	});

	return true;
});
