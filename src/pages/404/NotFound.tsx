import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	useEffect(
		() => {
			if (pathname !== '404') {
				navigate('/404');
			}
		},
		[ navigate, pathname ],
	);

	return <p>not found</p>;
};

export default NotFound;
