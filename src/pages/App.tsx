import { Route, Routes, Navigate } from 'react-router-dom';

// pages
import NotFound from './404/NotFound';
import HomePage from './homePage/homePage';
import AuthPage from './authPage/authPage';

function App () {
	return (
		<div className='app'>
			{/* Start Router */}
			<Routes>
				<Route path='/' element={<HomePage />} />

				<Route path='/auth/*' element={<AuthPage />} />

				<Route path='/404' element={<NotFound />} />

				<Route path='*' element={<Navigate to='/404' />} />
			</Routes>
			{/* End Router */}
		</div>
	);
}

export default App;
