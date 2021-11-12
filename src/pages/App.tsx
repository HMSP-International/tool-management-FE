import { Route, Routes } from 'react-router-dom';

// components
// components/shared
import Header from '../components/shared/Header/header';
import Footer from '../components/shared/Footer/footer';

// pages
import HomePage from './homePage/homePage';

function App () {
	return (
		<div className='app'>
			<Header />

			{/* Start Router */}
			<Routes>
				<Route path='/test/*' element={<HomePage />} />

				<Route path='/test123' element={<HomePage />} />

				<Route path='/' element={<HomePage />} />
			</Routes>
			{/* End Router */}

			<Footer />
		</div>
	);
}

export default App;
