import styled from 'styled-components';

export const AssigneeStyled = styled.div`
	padding: 10px;
	display: grid;
	grid-template-columns: auto 1fr;
	justify-content: space-between;

	.left {
		width: 100px;
	}

	.right {
		display: flex;
		align-items: center;

		&__avt {
			img {
				height: 25px;
				width: 25px;
				object-fit: cover;
				margin-right: 10px;
			}
		}
	}
`;
