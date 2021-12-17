import { ApolloError } from '@apollo/client';

export const handleApolloError = (error: unknown): { title: string; extensions: string[] } => {
	const apolloError = error as ApolloError;
	const { graphQLErrors } = apolloError;

	let extensions: any = [];

	if (graphQLErrors.length > 0) {
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
	}
	else {
		return {
			title: apolloError.message,
			extensions: [ apolloError.message ],
		};
	}
};

export const x = 1