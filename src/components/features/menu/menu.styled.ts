import styled from 'styled-components';

export const MenuStyled = styled.section`
	display: inline-block;
	width: auto;
	height: auto;
	min-height: 100vh;

	.menu__close {
		min-width: 50px;
		min-height: 50px;
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		transition: all 0.3s ease-in-out;

		> * {
			display: none;
		}

		.menu__btn-to-open {
			position: fixed;
			top: 0;
			left: 0;

			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			width: 50px;
			height: 50px;
			background-color: lightblue;

			svg {
				font-size: 25px;
			}
		}
	}

	.menu__open {
		min-width: 300px;
		width: 100%;
		height: 100%;

		background-color: lightblue;
		transition: all 0.3s ease-in-out;

		.menu__btn-to-open {
			display: none;
		}
	}
`;
