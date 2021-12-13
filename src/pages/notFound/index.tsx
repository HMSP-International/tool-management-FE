import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

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

	return <Link to='/'>back to home page</Link>;
};

export default NotFound;
