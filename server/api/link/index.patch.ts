import { z } from 'zod';

const bodySchema = z.object({
	id: z.string().uuid(),
	name: z.string().optional(),
	url: z.string().optional(),
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

	const link = await event.context.prisma.link.findUnique({
		where: {
			id: body.id,
		},
	});

	if (!link) {
		return sendError(
			event,
			createError({
				statusMessage: 'no link found with given id',
				statusCode: 404,
			}),
		);
	}

	const renamedLink = await event.context.prisma.link.update({
		where: {
			id: body.id,
		},
		data: {
			name: body.name,
			url: body.url,
		},
	});

	return renamedLink;
});
