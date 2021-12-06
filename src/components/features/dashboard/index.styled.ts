import styled from 'styled-components';

export const DashboardStyled = styled.section`
	display: flex;
	flex-direction: column;
	padding: 50px 0;
	width: 90%;
	margin: 0 auto;

	.dashboard__add-new-user {
		margin-bottom: 10px;
		display: flex;
		justify-content: flex-end;
		button {
			padding: 5px 50px;
			background-color: lightgray;
			cursor: pointer;
			border-radius: 5px;
		}
	}
`;
