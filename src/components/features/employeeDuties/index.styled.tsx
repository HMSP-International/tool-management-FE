import styled from 'styled-components';

export const EmployeeDutiesStyled = styled.section`
	width: 100%;
	.employee-duties__filter {
		display: grid;
		justify-content: space-around;
		grid-template-columns: 1fr 1fr;

		&__container {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}

		&__name {
			p {
				margin-bottom: 10px;
				bold: 600;
				cursor: context-menu;
			}
		}

		&__item {
			border: 1px solid lightblue;
			transition: all 0.3s ease-in-out;
			cursor: pointer;
			border-radius: 5px;

			.css-qc6sy-singleValue {
				transition: all 0.3s ease-in-out;
			}

			&:hover {
				border: 1px solid white;
				background-color: lightblue;
				.css-qc6sy-singleValue {
					color: white;
				}
			}
		}
	}
`;
