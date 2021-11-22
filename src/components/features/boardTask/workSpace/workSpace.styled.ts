import styled from 'styled-components';

export const WorkSpaceStyled = styled.section`
	width: 100vw - 300px;
	margin-top: 100px;

	display: flex;
	overflow-x: scroll;
	padding: 0 30px;

	&::-webkit-scrollbar {
		height: 10px;
		cursor: pointer;
		background-color: lightblue;
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
		min-width: 240px;
		margin: 0 20px;
	}

	.wrap-list__title {
		display: flex;
		justify-content: space-between;
		align-items: center;

		margin-bottom: 20px;
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
`;
