import { ApolloError } from '@apollo/client';

export const handleApolloError = (error: unknown): { title: string; extensions: [] } => {
	const { graphQLErrors } = error as ApolloError;
	console.log(graphQLErrors);

	let extensions: any = [];
	if (typeof graphQLErrors[0].extensions === 'string') {
		extensions.push(graphQLErrors[0].extensions);
	}
	else {
		extensions = graphQLErrors[0].extensions;
	}

	return {
		title: graphQLErrors[0].message,
		extensions,
	};
};
