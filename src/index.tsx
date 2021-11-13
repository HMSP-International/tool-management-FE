import React from 'react';
import ReactDOM from 'react-dom';
import Loading from './components/shared/Loading/loading';
// Router
import { BrowserRouter } from 'react-router-dom';
import App from './pages/App';
// Graphql
import client, { ApolloProvider } from './graphql/configGraphql';
// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor, store } from './app/store';
// .evn
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<ApolloProvider client={client}>
				<Provider store={store}>
					<PersistGate loading={<Loading />} persistor={persistor}>
						<App />
					</PersistGate>
				</Provider>
			</ApolloProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);
