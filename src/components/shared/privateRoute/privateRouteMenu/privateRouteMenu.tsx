import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateAuth } from 'slices/auth/interfaces';
import { logout } from 'slices/auth/slice';
import jwt_decode from 'jwt-decode';
import { mainRouterPage } from 'global/routes/page';
import Menu from 'components/features/menu/menu';
import MenuPublic from 'components/features/menuPublic/menuPublic';

interface IDecode {
	exp: number;
}

const PrivateRouteMenu: React.FC = () => {
	const dispatch = useDispatch();
	const auth: IInitialStateAuth = useSelector((state: RootState) => state.auth);

	const handleCheckAuth = () => {
		if (auth.jwt) {
			const { exp } = jwt_decode<IDecode>(auth.jwt);

			if (Date.now() >= exp * 1000) {
				dispatch(logout(''));
				return <Navigate to={`/${mainRouterPage.auth.login}`} />;
			}
			else {
				return <Menu />;
			}
		}
		else {
			return <MenuPublic />;
		}
	};

	return <React.Fragment>{handleCheckAuth()}</React.Fragment>;
};

export default PrivateRouteMenu;
