import { Route, Routes, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Login from '../../components/features/auth/login/login';
import Forgot from '../../components/features/auth/forgot/forgot';
import { AuthStyled, MainStyled, BottomStyled, AppStyled } from './auth.styled';
import { HeaderStyled } from './auth.styled';
// routes
import { mainRouterPage } from 'global/routes/page';

const AuthPage = () => {
	return (
		<main className='auth-page'>
			<AppStyled />
			<AuthStyled>
				<HeaderStyled>
					<Link to={mainRouterPage.home}>{}</Link>
				</HeaderStyled>
				<MainStyled>
					<div className='auth-page__main-container'>
						<Routes>
							<Route path={mainRouterPage.login} element={<Login />} />
							<Route path={mainRouterPage.forgot} element={<Forgot />} />
							<Route path='/*' element={<Navigate to={mainRouterPage.login} />} />
						</Routes>
						<BottomStyled>LET'S MAKE THE WORLD MORE PRODUCTIVE, TOGETHER.</BottomStyled>
					</div>
				</MainStyled>
			</AuthStyled>
		</main>
	);
};

export default AuthPage;
