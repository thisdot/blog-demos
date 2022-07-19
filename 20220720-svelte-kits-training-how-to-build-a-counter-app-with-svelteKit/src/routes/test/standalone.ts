import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async () => {
	return {
		status: 200,
		body: {
			foo: 'bar'
		}
	};
};

export const post: RequestHandler = async () => {
	return {
		status: 303,
		headers: {
			location: '/'
		}
	};
};
