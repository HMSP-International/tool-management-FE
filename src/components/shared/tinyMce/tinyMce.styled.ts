import styled from 'styled-components';

interface Props {
	marginTop?: string;
	marginBottom?: string;
}

export const TinyStyled =
	styled.section <
	Props >
	`
	margin-top: ${props => props.marginTop || '0px'};
	margin-bottom: ${props => props.marginBottom || '10px'};


	.tox-statusbar {
		display: none !important;
	}

	.btn-get-text{
		.btn {
			margin-top: 20px;
			display: inline-block;
			padding: 5px 10px;
			background-color: lightblue;
			border-radius: 5px;
			cursor: pointer;
			color: white;
			transition: all 0.3s ease-out;

			&:hover{
                background-color: #6db9d1;
            }
		}

		.line {
			height: 2px;
			width: 100%;
			margin-top: 20px;
			background-color: lightgray;
		}
	}
`;
