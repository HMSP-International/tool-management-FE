import { ThemeProvider } from 'styled-components';
import * as React from 'react';

import ResetStyled from './reset.styled';
import theme from './theme.styled'; // global variable

const GlobalStyle: React.FC = ({ children }) => {
	return (
		<ThemeProvider theme={theme}>
			<ResetStyled />
			{children}
		</ThemeProvider>
	);
};

export default GlobalStyle;
