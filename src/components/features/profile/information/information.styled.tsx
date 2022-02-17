import styled from 'styled-components';

export const InformationStyled = styled.article`
	.information__button__suscess {
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.3s ease-out;

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

	.information__button {
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

	.information__profile {
		padding: 30px 0;
		display: flex;
		flex-direction: column;
		&__item {
			padding: 20px 50px;
			display: flex;
			justify-content: space-between;

			&__title {
				min-width: 200px;
			}
			&__content {
				padding: 5px 10px;
				min-width: 200px;
				border: none;
			}
			&__content-public {
				padding: 5px 10px;
				min-width: 200px;
			}
		}
	}

	.information__avatar {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		&__title {
			font-weight: 500;
			font-size: ${props => props.theme.fontSize.small1};
		}

		&__img {
			img {
				width: 50px;
				height: 50px;
				cursor: pointer;
				border-radius: 100rem;
			}
		}
	}

	.information {
		padding: 30px 0;
		height: auto;

		box-shadow: 5px 5px 20px 20px #0000000A;
		background-color: #fffffe;
	}
`;
