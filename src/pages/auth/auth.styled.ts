import styled from 'styled-components';

import { createGlobalStyle } from 'styled-components';

export const AppStyled = createGlobalStyle`
    .app {
        display: block;
    }
`;

export const AuthStyled = styled.section`
	height: 100vh;
	background-color: rgb(241, 211, 150);

	display: flex;
	flex-direction: column;
`;

export const HeaderStyled = styled.div`
	height: auto;
	min-height: 100px;
`;

export const MainStyled = styled.div`
	height: 100%;
	min-height: 630px;
	display: flex;

	.auth-page__main-container {
		width: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;

		.auth-page__main-form {
			min-height: 400px;
			min-width: 480px;

			padding: 30px 60px 26px 60px;
			border-radius: 8px;

			position: relative;

			transition: all 0s ease 0s;
			box-shadow: rgba(16, 30, 54, 0.25) 0px 25px 75px 0px;
		}
	}
`;

export const BottomStyled = styled.div`
	margin-top: 45px;
	font-size: ${props => props.theme.fontSize.mini};
	font-weight: 700;
	color: white;
	letter-spacing: 2px;
`;
