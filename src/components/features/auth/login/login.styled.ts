import styled from 'styled-components';

export const LoginStyled = styled.div`
	margin-top: 10px;
	min-height: 395px;
	min-width: 480px;

	padding: 30px 60px 20px 60px;
	border-radius: 8px;

	background-color: white;

	transition: all 0s ease 0s;
	box-shadow: rgba(16, 30, 54, 0.25) 0px 25px 75px 0px;

	.login-page__form-title {
		> * {
			text-align: center;
			font-weight: 700;
			font-size: ${props => props.theme.fontSize.normal1};
			margin: 20px 0;
		}
	}

	.login-page__form-password {
		margin-top: 20px;
	}

	.login-page__form-field {
		label {
			display: inline-block;
			margin-bottom: 5px;
			font-size: ${props => props.theme.fontSize.mini};
			font-weight: 500;
		}

		div {
			height: 40px;
			position: relative;

			.icon {
				font-size: ${props => props.theme.fontSize.normal2};
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 10px;
			}

			input {
				height: 100%;
				font-size: ${props => props.theme.fontSize.small};
				padding: 8px 20px 8px 40px;

				border: 1px solid #e9ebf0;
				border-radius: 4px;
				cursor: text;

				background-color: #ffffff;

				width: 100%;

				&:focus {
					outline: none !important;
					border: 1px solid lightblue;
					box-shadow: 0 0 1px #719ece;
				}

				&::placeholder {
					opacity: 0.5;
				}
			}
		}
	}

	.login-page__form-btn {
		margin-top: 30px;

		button {
            display: inline-block;
			height: 50px;
			width: 100%;
			border-radius: 4px;
			transition: background-color 0.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) 0s;
			background-color: #7b68ee;
			cursor: pointer;
            outline-none;
            border-radius: none;

            color: white;
            font-size: ${props => props.theme.fontSize.mini};
            font-weight: 700;

			&:hover {
				background-color: #5f48ea;
			}

			&:active{
				border: 1px solid #fff;
			}
		}
	}

    .login-page__form-forget {
        margin-top: 20px;
        display: flex;
        justify-content: center;

        .p{
            display: inline-block;
            text-align: center;
            cursor: pointer;
            color: #7b68ee;
            font-size: ${props => props.theme.fontSize.mini};

            &:hover{
                font-weight: 600;
            }
        }
`;
