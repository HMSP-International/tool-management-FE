import styled from 'styled-components';

export const ProfileStyled = styled.main`
	display: flex;
	justify-content: center;
	width: 100%;
	background-color: #fffff0;

	.profile-page__body {
		margin-top: 20px;
	}

	.profile-page__header {
		height: auto;
		width: 100%;
		min-height: 50px;
		border-radius: 5px;
		overflow: hidden;

		&__group-tab {
			height: 100%;
			min-height: inherit;
			display: grid;
			justify-content: space-around;
			align-items: end;
			grid-template-columns: 100px 100px 100px;
			grid-template-rows: 1fr;

			.border-bottom {
				border-bottom: 1px solid gray;
				transition: all 0.3s ease-in-out;
			}

			&__item {
				height: 100%;
				min-height: inherit;
				/* background-color: lightcoral; */
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
			}
		}
	}

	.profile-page {
		width: 100%;
		max-width: 700px;
		margin: 30px 0px;
		padding: 20px;
	}
`;
