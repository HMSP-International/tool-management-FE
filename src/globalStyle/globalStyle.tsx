import { ThemeProvider } from 'styled-components';
import * as React from 'react';

import AppStyled from './app.styed';
import CustomStyled from './custom';
import ResetStyled from './reset.styled';
import ImportFont from './import';
import theme from './theme.styled'; // global variable

import 'antd/dist/antd.css';

const GlobalStyle: React.FC = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<AppStyled />
			<ImportFont />
			<ResetStyled />
			<CustomStyled />
			{children}
		</ThemeProvider>
	);
};

export default GlobalStyle;
