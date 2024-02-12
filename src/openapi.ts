import { createRoute, z } from "@hono/zod-openapi";

export const mainApiInfo = {
	info: {
		title: 'Recommend Me API',
		description: 'API for getting recommendation links.',
		version: 'v1'
	},
	servers: [{
		url: 'https://recommend-me.alkuramshina.workers.dev',
		description: 'Main API server'
	}],
	openapi: '3.1.0'
};

export const getLinksRoute = createRoute({
	method: 'get',
	path: '/links',
	operationId: 'getLinks',
	summary: 'A query to get customizable recommendation links based on your inquiry, your needs and the contecxt of your conversation.',
	parameters: [{
		in: 'query',
		name: 'data',
		schema: {
			type: 'string'
		},
		required: true,
		description: 'Current conversation context to customize recommendations better'
	}],
	responses: {
		200: {
			description: 'A JSON array of recommendation links',
			content: {
				'application/json': {
					schema: z.array(z.object({
						url: z.string(),
						name: z.string(),
						description: z.string()
					}))
				}
			}
		},
		401: {
			description: 'Unauthorized access'
		},
		500: {
			description: 'Request error'
		}
	}
});