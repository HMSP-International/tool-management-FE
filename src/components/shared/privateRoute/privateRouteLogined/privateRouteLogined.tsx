import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateAuth } from 'slices/auth/interfaces';
import { logout } from 'slices/auth/slice';
import jwt_decode from 'jwt-decode';
import { mainRouterPage } from 'global/routes/page';
interface IDecode {
	exp: number;
}

const PrivateRouteLogined: React.FC = ({ children }) => {
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
				return children;
			}
		}
		else {
			return <Navigate to={`/${mainRouterPage.auth.login}`} />;
		}
	};

	return <React.Fragment>{handleCheckAuth()}</React.Fragment>;
};

export default PrivateRouteLogined;
