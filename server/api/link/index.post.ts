import { z } from 'zod';

const bodySchema = z.object({
	name: z.string(),
	url: z.string().url(),
	folderId: z.string().uuid(),
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

	const link = await event.context.prisma.link
		.create({
			data: {
				name: body.name,
				url: body.url,
				folderId: body.folderId,
			},
		})
		.catch(e => {
			if (e) {
				return sendError(
					event,
					createError({
						statusMessage: 'link already exists',
						statusCode: 400,
					}),
				);
			}
		});

	return link;
});
