import { Route, Routes, Navigate } from 'react-router-dom';

// pages
import HomePage from './pages';
import AuthPage from './pages/auth';
import DashboardPage from './pages/dashboard';
import ManagePage from './pages/manage';
import NotFound from './pages/notFound';
import ProfilePage from './pages/profile';
import VerifyPage from './pages/verify';

import PrivateRoute from './components/shared/privateRoute/privateRoute';

function App () {
	return (
		<div className='app'>
			{/* Start Router */}

			<Routes>
				<Route
					path='/'
					element={
						<PrivateRoute>
							<HomePage />
						</PrivateRoute>
					}
				/>

				<Route path='/auth/*' element={<AuthPage />} />

				<Route
					path='/dashboard'
					element={
						<PrivateRoute>
							<DashboardPage />
						</PrivateRoute>
					}
				/>

				<Route
					path='/manage/:_id'
					element={
						<PrivateRoute>
							<ManagePage />
						</PrivateRoute>
					}
				/>

				<Route path='/notFound' element={<NotFound />} />

				<Route
					path='/profile/*'
					element={
						<PrivateRoute>
							<ProfilePage />
						</PrivateRoute>
					}
				/>

				<Route
					path='/verify/:name'
					element={
						<PrivateRoute>
							<VerifyPage />
						</PrivateRoute>
					}
				/>

				<Route path='*' element={<Navigate to='/notFound' />} />
			</Routes>
			{/* End Router */}
		</div>
	);
}

export default App;
