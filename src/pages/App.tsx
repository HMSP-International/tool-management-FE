import { Route, Routes, Navigate } from 'react-router-dom';

// pages
import NotFound from './404/NotFound';
import HomePage from './homePage/homePage';
import AuthPage from './authPage/authPage';
import ManagePage from './managePage/managePage';
import ProfilePage from './profilePage/profilePage';
import PrivateRoute from './privateRoute';

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

				<Route
					path='/manage/*'
					element={
						<PrivateRoute>
							<ManagePage />
						</PrivateRoute>
					}
				/>

				<Route
					path='/profile/*'
					element={
						<PrivateRoute>
							<ProfilePage />
						</PrivateRoute>
					}
				/>

				<Route path='/auth/*' element={<AuthPage />} />

				<Route path='/404' element={<NotFound />} />

				<Route path='*' element={<Navigate to='/404' />} />
			</Routes>
			{/* End Router */}
		</div>
	);
}

export default App;
