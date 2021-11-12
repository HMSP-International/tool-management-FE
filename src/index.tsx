import React from 'react';
import ReactDOM from 'react-dom';

// Router
import { BrowserRouter } from 'react-router-dom';
import App from './pages/App';

// Graphql
import client, { ApolloProvider } from './graphql/config';

// .evn
import dotenv from 'dotenv';
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
