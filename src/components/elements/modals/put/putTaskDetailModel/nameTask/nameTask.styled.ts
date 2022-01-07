import styled from 'styled-components';

export const NameTaskStyled = styled.div`
	color: #172b4d;
	font-size: ${props => props.theme.fontSize.normal2};
	font-weight: 600;
	padding: 10px 0;

	display: flex;

	input {
		width: 70%;
		border: none;
		outline: none;
		padding: 10px 0 5px 0;
		font-size: ${props => props.theme.fontSize.nomal1};
		border-bottom: 1px solid lightgray;
	}

	.button-group {
		display: flex;
		align-items: center;
		justify-content: space-between;

		margin-left: 20px;
		width: 80px;

		position: relative;
		top: 5px;

		button {
			width: 30px;
			height: 30px;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: white;
			box-shadow: 0px 0px 5px 2px lightgray;
			transition: all 0.3 ease-out;
			color: white;

			&:hover {
				position: relative;
				top: 1px;
				left: 1px;

				width: 32px;
				height: 32px;
				box-shadow: 0px 0px 10px 5px lightgray;
			}
		}
		.btn-ok {
			background-color: lightblue;
		}

		.btn-cancel {
			background-color: red;
		}
	}
`;
