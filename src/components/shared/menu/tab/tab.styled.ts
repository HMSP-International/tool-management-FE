import styled from 'styled-components';

export const TabStyled = styled.article`
	.menu__body__tabs {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;

		padding: 20px 10px;
	}

	.menu__body__tabs-item {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		border-right: 1px solid #fff;
		width: 100%;
		margin: 10px 0px;

		> h4 {
			margin-left: 20px;
			cursor: pointer;

			font-family: ${props => props.theme.fontFamily.submain};
			color: #fff;

			a {
				color: white;
			}
		}

		> svg {
			cursor: pointer;
		}
	}
`;
