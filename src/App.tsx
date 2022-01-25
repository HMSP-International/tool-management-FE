import { Route, Routes, Navigate } from 'react-router-dom';
import { SocketContext, socket } from './socketIO/context';
// pages
import HomePage from './pages';
import AuthPage from './pages/auth';
import DashboardPage from './pages/dashboard';
import EmployeeDutiesPage from './pages/employee-duties';
import ManagePage from './pages/manage';

import NotFound from './pages/notFound';
import ProfilePage from './pages/profile';
import VerifyPage from './pages/verify';
import Menu from 'components/features/menu/menu';
import PrivateRouteLogined from 'components/shared/privateRoute/privateRouteLogined/privateRouteLogined';

function App () {
	return (
		<SocketContext.Provider value={socket}>
			<div className='app'>
				{/* Start Router */}
				<Menu />
				<Routes>
					<Route
						path='/'
						element={
							<PrivateRouteLogined>
								<HomePage />
							</PrivateRouteLogined>
						}
					/>

					<Route path='/auth/*' element={<AuthPage />} />

					<Route
						path='/dashboard'
						element={
							<PrivateRouteLogined>
								<DashboardPage />
							</PrivateRouteLogined>
						}
					/>

					<Route
						path='/employee-duties/:_userId'
						element={
							<PrivateRouteLogined>
								<EmployeeDutiesPage />
							</PrivateRouteLogined>
						}
					/>

					<Route
						path='/manage/:_projectId/*'
						element={
							<PrivateRouteLogined>
								<ManagePage />
							</PrivateRouteLogined>
						}
					/>

					<Route path='/notFound' element={<NotFound />} />

					<Route
						path='/profile/*'
						element={
							<PrivateRouteLogined>
								<ProfilePage />
							</PrivateRouteLogined>
						}
					/>

					<Route
						path='/verify/:name'
						element={
							<PrivateRouteLogined>
								<VerifyPage />
							</PrivateRouteLogined>
						}
					/>

					<Route path='*' element={<Navigate to='/notFound' />} />
				</Routes>
				{/* End Router */}
			</div>
		</SocketContext.Provider>
	);
}

export default App;
