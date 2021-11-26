import * as React from 'react';

// components
// components/shared
// import Header from '../header/header';
// import Footer from '../footer/footer';
import Menu from '../menu/menu';

const ContainerPage: React.FC = ({ children }) => {
	return (
		<React.Fragment>
			{/* <Header /> */}
			<Menu />
			{children}
			{/* <Footer /> */}
		</React.Fragment>
	);
};

export default ContainerPage;
