import styled from 'styled-components';

export const TitleSubMenuStyled = styled.div`
	display: flex;
	justify-content: space-between;
	height: 48px;

	.submenu__icons {
		display: flex;

		> * {
			margin-right: 10px;
		}

		&__edit {
			svg {
				position: relative;
				top: 3px;
			}
		}
	}
`;
