import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { IInitialStateAuth } from '../../slices/auth/interfaces';
import * as devEnv from './dev';
import * as prodEnv from './prod';
let apis;

if (process.env.NODE_ENV === 'production') {
	apis = prodEnv.default;
}
else {
	apis = devEnv.default;
}

const httpLink = createHttpLink({
	uri: apis.baseDomain,
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('persist:auth');

	if (!token) return { headers };

	let { jwt }: IInitialStateAuth = JSON.parse(token);
	if (jwt === '""') return { headers };

	// return the headers to the context so httpLink can read them
	jwt = jwt.slice(1, -1);

	return {
		headers:
			{
				...headers,
				authorization: `Bearer ${jwt || ''}`,
			},
	};
});

const client = new ApolloClient({
	// uri: apis.baseDomain,
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink),
});

export { ApolloProvider };
export default client;
