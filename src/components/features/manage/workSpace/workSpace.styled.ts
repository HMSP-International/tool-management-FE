import styled from 'styled-components';

export const WorkSpaceStyled = styled.section`
	padding: 0 20px;
	width: 100vw - 300px;

	overflow-x: scroll;
	&::-webkit-scrollbar {
		height: 10px;
		cursor: pointer;
	}
	&::-webkit-scrollbar-thumb {
		background: linear-gradient(to right, #232526, #414345);
		cursor: pointer;
		transition: all 0.3s ease-out;

		&:hover {
			background: linear-gradient(to right, #414345, #232526);
		}

		&:active {
			background: linear-gradient(to right, #232526, #414345);
		}
	}

	.workspace__header {
		margin: 0 5px;
		height: 180px;

		&__tree {
			padding: 10px 0;
			color: #a993a4;
			font-size: 15px;
		}

		&__title {
			padding: 5px 0;
			font-size: 24px;
			font-weight: 600;
		}

		&__assign {
			display: flex;
			align-items: center;

			> * {
				margin-right: 20px;
			}

			&__input {
				height: 40px;
				input {
					width: 100%;
					height: 100%;
					padding: 8px 6px;
					border: 1px solid lightgray;
					outline: none;

					transition: 0.3s ease-in-out;

					&:focus {
						border: 1px solid gray;
					}

					&:hover {
						background-color: lightgray;
						border: 1px solid gray;
					}
				}
			}

			&__group-avt {
				display: flex;
				&__item {
					margin-right: 5px;
					img {
						height: 30px;
						width: 30px;
						object-fit: cover;
					}
				}
			}

			&__create-list {
				flex-grow: 1;
				display: flex;
				justify-content: flex-end;

				button {
					cursor: pointer;
					padding: 5px 10px;
					border-radius: 5px;
				}
			}
		}
	}

	.workspace__body {
		padding-right: 10px;
		width: 100%;
		height: calc(100vh - 190px);
		display: flex;

		overflow: scroll;

		&::-webkit-scrollbar {
			height: 10px;
			width: 10px;
			cursor: pointer;
		}
		&::-webkit-scrollbar-thumb {
			background: linear-gradient(to right, #232526, #414345);
			cursor: pointer;
			transition: all 0.3s ease-out;

			&:hover {
				background: linear-gradient(to right, #414345, #232526);
			}

			&:active {
				background: linear-gradient(to right, #232526, #414345);
			}
		}

		.wrap-list {
			min-width: 300px;
			margin: 20px 5px;
		}

		.wrap-list__title {
			border-radius: 5px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			margin-bottom: 10px;
			padding: 0 10px;
			height: 50px;
			border-top: 3px solid gray;
			box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 2px 0px;

			font-size: ${props => props.theme.fontSize.submain};
			cursor: context-menu;
			font-weight: 600;
			color: gray;

			&__left {
				display: flex;
				&__number {
					border-radius: 100rem;
					display: flex;
					border: 1px solid gray;
					height: 22px;
					width: 22px;
					justify-content: center;
					align-items: center;
					margin-left: 10px;
				}
			}

			&__right {
				&__icon {
					cursor: pointer;
					font-size: 20px;
				}
			}
		}

		/* css libary */
		.sc-giYglK,
		.kGiKpQ {
			border-radius: 5px;
		}
	}
`;
