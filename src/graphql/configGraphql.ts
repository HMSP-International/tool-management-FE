import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import * as devEnv from './dev';
import * as prodEnv from './prod';

let apis;

if (process.env.NODE_ENV === 'production') {
	apis = prodEnv.default;
}
else {
	apis = devEnv.default;
}

const client = new ApolloClient({
	uri: apis.baseDomain,
	cache: new InMemoryCache(),
});

export { ApolloProvider };
export default client;
