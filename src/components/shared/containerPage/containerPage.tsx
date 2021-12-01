import React, { useEffect } from 'react';

// components
// components/shared
// import Header from '../header/header';
// import Footer from '../footer/footer';
import Menu from '../menu/menu';

interface IProps {
	title?: string;
}

const ContainerPage: React.FC<IProps> = ({ children, title }) => {
	useEffect(
		() => {
			document.title = title || 'HMSP';
		},
		[ title ],
	);

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
