import styled from 'styled-components';

export const EmployeeDutiesStyled = styled.section`
	.employee-duties__filter {
		display: flex;
		justify-content: space-around;

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
