import styled from 'styled-components';

export const TaskStyled = styled.div`
	min-width: 260px;
	height: 109px;
	padding: 10px;
	margin-bottom: 5px;
	cursor: pointer;
	display: flex;
	flex-direction: column;

	font-size: ${props => props.theme.fontSize.big};
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0px 1px 5px 0px gray;

	.task-name {
		font-size: 14px;
		margin-bottom: 5px;
		color: #172d4d;
		flex-grow: 1;
	}

	.task-type {
		display: inline-block;
		background-color: transparent//#eae6ff;
		font-size: 11px;
		font-weight: 700;
		padding: 2px 4px;
		color: #403294;
	}

	.task-bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* margin-top: 15px; */

		&__ {
			color: #7a689a;
			font-size: 12px;
		}

		&__avt {
			height: 28px;
			width: 28px;
			border-radius: 100rem;
			overflow: hidden;

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
`;
