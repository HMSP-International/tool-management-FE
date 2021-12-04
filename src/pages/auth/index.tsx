import { Route, Routes, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from '@components/features/auth/login/login';
import Forgot from '@components/features/auth/forgot/forgot';
// import NotFound from '../../pages/404/NotFound';

import { AuthStyled, MainStyled, BottomStyled, AppStyled } from './auth.styled';
import { HeaderStyled } from './auth.styled';

const AuthPage = () => {
	return (
		<main className='auth-page'>
			<AppStyled />
			<AuthStyled>
				<HeaderStyled>
					<Link to={'/'}>{}</Link>
				</HeaderStyled>
				<MainStyled>
					<div className='auth-page__main-container'>
						<Routes>
							<Route path='/login' element={<Login />} />
							<Route path='/forgot' element={<Forgot />} />
							<Route path='/*' element={<Navigate to='login' />} />
						</Routes>
						<BottomStyled>LET'S MAKE THE WORLD MORE PRODUCTIVE, TOGETHER.</BottomStyled>
					</div>
				</MainStyled>
			</AuthStyled>
		</main>
	);
};

export default AuthPage;
