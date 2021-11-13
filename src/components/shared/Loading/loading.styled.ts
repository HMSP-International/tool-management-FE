import styled from 'styled-components';

export const LoadingStyled = styled.div`
	position: fixed;
	top: 0;
	left: 0;

	width: 100%;
	height: 100vh;
	background-color: #ff7799;
	color: black;

	opacity: 0.1;

	display: flex;
	justify-content: center;
	align-items: center;

	transition: all 1s ease-in-out;
`;
