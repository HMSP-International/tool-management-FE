import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(
		() => {
			if (pathname !== 'notFound') {
				navigate('/notFound');
			}
		},
		[ navigate, pathname ],
	);

	return <p>not found</p>;
};

export default NotFound;
