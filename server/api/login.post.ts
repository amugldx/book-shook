import { z } from 'zod';

const bodySchema = z.object({
	username: z.string(),
	password: z.string(),
});

export default defineEventHandler(async event => {
	const body = await readValidatedBody(event, bodySchema.parse);

	if (!body) {
		return sendError(
			event,
			createError({
				statusMessage: 'invalid request body',
				statusCode: 406,
			}),
		);
	}

	const user = await event.context.prisma.user.findUnique({
		where: {
			username: body.username,
		},
	});

	if (!user) {
		return sendError(
			event,
			createError({
				statusMessage: 'user not found',
				statusCode: 404,
			}),
		);
	}

	if (user?.password !== body.password) {
		return sendError(
			event,
			createError({
				statusMessage: 'password does not match',
				statusCode: 406,
			}),
		);
	}

	if (user.username === 'amugldx') {
		setCookie(event, 'BookShookUser', user.id, {
			httpOnly: true,
		});
		setCookie(event, 'BookShookLogged', 'true', {
			httpOnly: false,
		});
	}

	setCookie(event, 'BookShookTest', 'true', {
		httpOnly: false,
	});
	setCookie(event, 'BookShookLogged', 'true', {
		httpOnly: false,
	});

	return {
		id: user.id,
		username: user.username,
	};
});
