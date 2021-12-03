import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../app/rootReducer';
import { IInitialStateAuth } from '../../../slices/auth/interfaces';
import { logout } from '../../../slices/auth/slice';
import jwt_decode from 'jwt-decode';

interface IDecode {
	exp: number;
}

const PrivateRoute: React.FC = ({ children }) => {
	const dispatch = useDispatch();
	const auth: IInitialStateAuth = useSelector((state: RootState) => state.auth);

	const handleCheckAuth = () => {
		if (auth.jwt) {
			const { exp } = jwt_decode<IDecode>(auth.jwt);

			if (Date.now() >= exp * 1000) {
				dispatch(logout(''));
				return <Navigate to='/auth/login' />;
			}
			else {
				return children;
			}
		}
		else {
			return <Navigate to='/auth/login' />;
		}
	};

	return <React.Fragment>{handleCheckAuth()}</React.Fragment>;
};

export default PrivateRoute;
