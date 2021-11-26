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

	h1, h2, h3, h4, h5, h6, p{
		margin-bottom: 0;
	}

	a{ 
		color: black; 
	}

	img{
		object-fit: cover;
	}

	input {
		&:focus{outline:none}
		border: 1px solid lightgray;
	}
	
`;

export default ResetStyled;
