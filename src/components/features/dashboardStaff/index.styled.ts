import styled from 'styled-components';

export const DashboardStyled = styled.section`
	display: flex;
	flex-direction: column;
	padding: 50px 0;
	width: 98%;
	margin: 0 auto;

	.dashboard__add-new-user {
		margin-bottom: 10px;
		display: flex;
		justify-content: flex-end;
		button {
			background-color: lightblue;
			color: gray;
			padding: 10px 40px;
			cursor: pointer;
			border-radius: 5px;
			transition: all 0.3s ease-out;

			&:hover {
				background-color: #6db9d1;
				color: white;
			}
		}
	}
`;
