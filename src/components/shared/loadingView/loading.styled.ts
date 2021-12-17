import styled from 'styled-components';

export const LoadingStyled = styled.section`
	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	height: 100vh;
	background-color: rgba(255, 119, 153, 0.2);
	color: black;

	display: flex;
	justify-content: center;
	align-items: center;

	transition: all 1s ease-in-out;

	span {
		color: lightgray;
	}
`;
