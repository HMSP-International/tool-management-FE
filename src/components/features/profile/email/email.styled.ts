import styled from 'styled-components';

export const EmailStyled = styled.article`
	border: 1px solid gray;
	padding: 30px 0;

	.email__button {
		margin-top: 30px;
		display: flex;
		justify-content: center;
		align-items: center;
		button {
			padding: 10px 20px;
			border-radius: 5px;
			cursor: pointer;
		}
	}

	.email__form {
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
`;
