import { z } from 'zod';

const bodySchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
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

	const folder = await event.context.prisma.folder.findUnique({
		where: {
			id: body.id,
		},
	});

	if (!folder) {
		return sendError(
			event,
			createError({
				statusMessage: 'no folder found with given id',
				statusCode: 404,
			}),
		);
	}

	const renamedFolder = await event.context.prisma.folder.update({
		where: {
			id: body.id,
		},
		data: {
			name: body.name,
		},
	});

	return renamedFolder;
});
