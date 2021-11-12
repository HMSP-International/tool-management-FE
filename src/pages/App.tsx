import { Route, Routes } from 'react-router-dom';

// Styled
// import { StyledHtml } from './styledApp';

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
				<Route path='/alo/*' element={<HomePage />} />

				<Route path='/alo123' element={<HomePage />} />

				<Route path='/' element={<HomePage />} />
			</Routes>
			{/* End Router */}

			{/* <GoTopButton /> */}
			<Footer />
		</div>
	);
}

export default App;
