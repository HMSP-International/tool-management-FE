import styled from 'styled-components';

export const EmailStyled = styled.article`
	padding: 30px 0;
	box-shadow: 5px 5px 20px 20px #0000000A;
	background-color: #fffffe;

	.button-update {
		margin-top: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			pointer-events: none;
			padding: 10px 20px;
			border-radius: 5px;
			cursor: pointer;
		}
	}

	.button-update__suscess {
		margin-top: 30px;
		display: flex;
		justify-content: center;
		align-items: center;

		button {
			padding: 10px 20px;
			border-radius: 5px;
			cursor: pointer;
			background-color: lightblue;

			transition: all 0.3s ease-in-out;
			&:hover {
				background-color: #69c9e9;
			}
		}
	}

	.group__form {
		min-height: 200px;
		&__item {
			padding: 30px 0;
			height: auto;

			padding: 20px 50px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			&__title {
				min-width: 200px;
			}
			&__content {
				padding: 5px 10px;
				min-width: 300px;
			}
		}
	}
`;
