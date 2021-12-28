import styled from 'styled-components';

export const TableUserStyled = styled.section`
	display: flex;
	flex-direction: column;

	.rdt_TableHeadRow {
		border: 1px solid #6db9d1;
		background: linear-gradient(to right, #36d1dc, #6dd5ed);
		border-radius: 10px 10px 0 0;

		.sc-bYoBSM {
			color: #975312;
			font-size: 16px;
		}

		.sc-iJKOTD {
			color: #975312;
		}
	}

	.rdt_TableRow {
		&:nth-of-type(even) {
			background-color: #fff;
		}
		&:nth-of-type(odd) {
			background-color: lightgray;
		}
	}

	.rdt_TableCell {
		color: #816aae;
	}
`;
