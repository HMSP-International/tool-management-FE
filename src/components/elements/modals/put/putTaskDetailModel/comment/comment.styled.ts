import styled from 'styled-components';

export const CommentStyled = styled.div`
	.comment {
		&__group-input {
			display: flex;
			flex-direction: column;
			margin-top: 10px;

			&__item {
				display: grid;
				gap: 20px;
				grid-template-columns: 36px 1fr;
				align-items: center;
				padding: 10px 10px;

				&__input {
					height: 100%;
					width: 70%;

					.html-tags {
						display: flex;
						align-items: center;
						height: 100%;
						width: 100%;
						border: none;
						outline: none;
						border-bottom: 1px solid lightgray;
					}
				}

				&__avt {
					img {
						object-fit: cover;
						height: 36px;
						width: 36px;
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
