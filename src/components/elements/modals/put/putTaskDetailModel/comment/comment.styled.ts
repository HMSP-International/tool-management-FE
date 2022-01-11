import styled from 'styled-components';

export const CommentStyled = styled.div`
	.click-to-comment {
		padding: 10px;

		display: grid;
		gap: 20px;
		grid-template-columns: 44px 1fr;
		align-items: center;
		padding: 10px 10px;

		&__box {
			input {
				height: 100%;
				width: 70%;
				padding: 10px;
				border-radius: 5px;

				&:hover {
					border-color: lightblue;
				}
			}
		}
	}

	.comment {
		&__group-input {
			display: flex;
			flex-direction: column;
			margin-top: 10px;

			&__item {
				display: grid;
				gap: 20px;
				grid-template-columns: 44px 1fr;
				align-items: center;
				padding: 10px 10px;

				&__input {
					height: 100%;
					width: 70%;

					display: flex;
					justify-content: space-between;

					.html-tags {
						display: flex;
						align-items: center;
						min-height: 23px;
						height: auto;
						width: 100%;
						border: none;
						outline: none;
						border-bottom: 1px solid lightgray;

						* {
							word-wrap: break-word;
						}
					}

					.action {
						display: none;
						transition: all 0.3s ease-out;
						&__edit {
							color: green;
							cursor: pointer;
						}
						&__delete {
							color: red;
							cursor: pointer;
						}
					}

					&:hover {
						.action {
							transition: all 0.3s ease-out;
							display: block;
						}
					}
				}

				&__avt {
					img {
						object-fit: cover;
						height: 44px;
						width: 44px;
						border-radius: 100rem;
					}
				}
			}
		}

		&__title {
			background-color: white;
			font-size: ${props => props.theme.fontSize.small2};
			font-weight: 500;
			border-radius: 5px;
			padding: 3px 5px;
			margin-left: 3px;
			max-width: 90px;
			box-shadow: 0px 0px 5px 1px lightblue;
		}
	}
`;
