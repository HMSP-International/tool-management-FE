import { ThemeProvider } from 'styled-components';
import * as React from 'react';

import CustomStyled from './custom';
import ResetStyled from './reset.styled';
import ImportFont from './import';
import theme from './theme.styled'; // global variable

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';

const GlobalStyle: React.FC = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<ImportFont />
			<ResetStyled />
			<CustomStyled />
			{children}
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</ThemeProvider>
	);
};

export default GlobalStyle;
