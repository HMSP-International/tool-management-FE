import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
// routes
import { mainRouterPage } from 'global/routes/page';
import { useSelector } from 'react-redux';
// redux
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateAuth } from 'slices/auth/interfaces';

const NotFound: React.FC = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const authRedux: IInitialStateAuth = useSelector((state: RootState) => state.auth);

	useEffect(
		() => {
			if (authRedux.jwt === '') {
				navigate('/' + mainRouterPage.auth.login);
			}
			else if (pathname !== mainRouterPage.notFound) {
				navigate('/' + mainRouterPage.notFound);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ navigate, pathname ],
	);

	return <Link to={`/${mainRouterPage.home}`}>back to home page</Link>;
};

export default NotFound;
