import * as React from 'react';

// components
// components/shared
import Header from '../header/header';
import Footer from '../footer/footer';

const ContainerPage: React.FC = ({ children }) => {
	return (
		<React.Fragment>
			<Header />
			{children}
			<Footer />
		</React.Fragment>
	);
};

export default ContainerPage;
