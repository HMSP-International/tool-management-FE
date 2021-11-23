import styled from 'styled-components';

export const HeaderStyled = styled.section`
	height: 50px;
	width: 100%;

	display: flex;
	justify-content: space-between;
	align-items: center;

	.menu__header__logo {
		display: flex;
		align-items: center;

		img {
			height: 40px;
			width: 40px;
			object-fit: cover;
			border-radius: 100rem;
			margin: 0 10px;
		}
		cursor: pointer;
	}

	.menu__header__avt {
		display: flex;
		align-items: center;

		img {
			height: 40px;
			width: 40px;
			object-fit: cover;
			cursor: pointer;
			border-radius: 100rem;
		}

		svg {
			margin: 0 10px;
			cursor: pointer;
		}
	}
`;
