import styled from 'styled-components';

export const PasswordStyled = styled.article`
	border: 1px solid gray;
	padding: 30px 0;

	.password__button__sucess {
		margin-top: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			padding: 10px 20px;
			border-radius: 5px;
			cursor: pointer;
			background-color: lightblue;
		}
	}

	.password__button {
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

	.password__form {
		padding: 30px 0;
		height: auto;

		padding: 20px 50px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		&__item {
			padding: 20px 0;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&__title {
			min-width: 200px;
		}
		&__content {
			padding: 5px 10px;
			min-width: 200px;
			padding: 5px 10px;
		}
	}
`;
