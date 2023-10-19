import { z } from 'zod';

const bodySchema = z.object({
	name: z.string(),
});

export default defineEventHandler(async event => {
	const body = await readValidatedBody(event, bodySchema.parse);
	const cookies = await parseCookies(event);

	if (!cookies.BookShookUser && !cookies.BookShookLogged) {
		return sendError(
			event,
			createError({
				statusMessage: 'you are unauthorized',
				statusCode: 401,
			}),
		);
	}

	const folder = await event.context.prisma.folder
		.create({
			data: {
				name: body.name,
			},
		})
		.catch(e => {
			if (e) {
				return sendError(
					event,
					createError({
						statusMessage: 'folder already exists',
						statusCode: 400,
					}),
				);
			}
		});

	return folder;
});
