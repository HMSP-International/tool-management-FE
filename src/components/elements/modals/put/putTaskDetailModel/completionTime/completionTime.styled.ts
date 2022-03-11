import styled from 'styled-components';

export const CompletionTimeStyled = styled.div`
	padding: 20px 0 0 0;
	display: flex;
	flex-direction: column;

	label {
		font-weight: bold;
		padding-bottom: 5px;
	}

	.input {
		display: grid;
		grid-template-columns: 1fr 50px;
		gap: 50px;

		input {
			padding: 5px 10px;
			border-radius: 5px;
		}

		button {
			background-color: lightblue;
			color: white;
			border-radius: 5px;
			cursor: pointer;

			transition: all 0.3s ease-in-out;

			&:hover {
				box-shadow: 0px 0px 5px 1px lightgray;
			}

			&:active {
				box-shadow: 0px 0px 2px 2px lightgray;
			}
		}
	}
`;
