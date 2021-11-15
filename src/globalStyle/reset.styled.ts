import { createGlobalStyle } from 'styled-components';

const ResetStyled = createGlobalStyle`
	*,
	*::after,
	*::before {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		font-family: Segoe UI, sans-serif;
	}

	button:focus {outline:0;}
	button { 
		border: none;
	}
}
`;

export default ResetStyled;
