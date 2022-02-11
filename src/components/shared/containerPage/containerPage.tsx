import React, { useEffect } from 'react';

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
			{children}
			{/* <Footer /> */}
		</React.Fragment>
	);
};

export default ContainerPage;
