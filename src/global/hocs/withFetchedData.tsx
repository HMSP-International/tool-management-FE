import * as React from 'react';
// import { ApolloError } from '@apollo/client';

// import LoadingView from '../components/shared/Loading/loadingView';
// import ErrorView from '../components/shared/Error/errorView';

interface IProps {
	(WrappedComponent: React.FC): React.FC;
}

const WithFetchedData: IProps = WrappedComponent => {
	// if (loading) {
	// 	return <LoadingView />;
	// }

	// if (error) {
	// 	return <ErrorView error={error} />;
	// }

	return props => {
		console.log(props);

		return <WrappedComponent {...props} />;
	};
};

export default WithFetchedData;
