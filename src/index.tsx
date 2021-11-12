import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/App';
import dotenv from 'dotenv';

import client, { ApolloProvider } from './graphql/config';
dotenv.config({ path: './.env' });

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<App />
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);
