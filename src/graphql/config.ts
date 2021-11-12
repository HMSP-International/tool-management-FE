import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
	uri: process.env.BE_HOST,
	cache: new InMemoryCache(),
});

export { ApolloProvider };
export default client;
