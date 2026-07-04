import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:4000/graphql';

export const graphqlClient = new GraphQLClient(endpoint);

export function graphqlClientWithAuth(token: string | null) {
	return new GraphQLClient(endpoint, {
		headers: token ? { Authorization: `Bearer ${token}` } : {},
	});
}