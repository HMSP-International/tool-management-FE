import styled from 'styled-components';

export const ListSpaceAndProjectDDStyled = styled.div`
	height: auto;

	.cont_principal {
		cursor: pointer;
		height: fit-content;
		filter: progid:DXImageTransform.Microsoft.gradient(
				startColorstr='#ffffff',
				endColorstr='#e0e8f5',
				GradientType=0
			);
		position: relative;
	}

	.cont_menu {
		position: absolute;
		width: 150px;
		left: 23%;
		margin-left: -100px;
	}

	.cont_titulo_menu {
		position: relative;
		float: left;
		width: 100%;
		height: 40px;
		overflow: hidden;
		background-color: #4f7df5;
		box-shadow: 0px 7px 30px -12px rgba(0, 0, 0, 0.5);
		margin-top: 20px;
		border-radius: 3px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		transform: translateX(100%);
	}

	.cont_icon_menu {
		position: relative;
		float: right;
		margin-right: 20px;
		top: 14px;
	}

	.cont_icon_menu > img {
		width: 32px;
		z-index: 2;
		position: relative;
	}

	.cont_titulo {
		position: relative;
		float: left;
		color: #fff;
		top: 50%;
		left: 10px;
		transform: translateY(-50%);
	}

	.cont_circle_1 {
		position: absolute;
		top: -16px;
		left: -16px;
		width: 64px;
		height: 64px;
		background-color: #fff;
		opacity: 0.3;
		z-index: 0;
		border-radius: 50%;
		animation: animation_circle_1 3s infinite;
		animation-direction: alternate;
		transform: scale(0);
	}

	.cont_circle_2 {
		position: absolute;
		top: -46px;
		left: -46px;
		width: 128px;
		height: 128px;
		background-color: #fff;
		opacity: 0.2;
		z-index: 0;
		border-radius: 50%;
		animation: animation_circle_1 3s infinite;
		animation-direction: alternate;
		animation-delay: 0.5s;
		transform: scale(0);
	}

	.cont_circle_3 {
		position: absolute;
		top: -80px;
		left: -80px;
		width: 192px;
		height: 192px;
		background-color: #fff;
		opacity: 0.1;
		z-index: 0;
		border-radius: 50%;
		animation: animation_circle_1 3s infinite;
		animation-direction: alternate;
		animation-delay: 1s;
		transform: scale(0);
	}

	.cont_circle_4 {
		position: absolute;
		top: -115px;
		left: -116px;
		width: 256px;
		height: 256px;
		background-color: #fff;
		opacity: 0.1;
		z-index: 0;
		border-radius: 50%;
		animation: animation_circle_1 3s infinite;
		animation-direction: alternate;
		animation-delay: 1.5s;
		transform: scale(0);
	}

	@-webkit-keyframes animation_circle_1 {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}
	@-o-keyframes animation_circle_1 {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}
	@-moz-keyframes animation_circle_1 {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}
	@keyframes animation_circle_1 {
		from {
			transform: scale(0);
		}
		to {
			transform: scale(1);
		}
	}

	.cont_icon_trg {
		position: relative;
		float: left;
		margin-bottom: -30px;
		z-index: 1;
		left: 10px;
		transform: translate(0px, 10px);
		transition: all 0.5s;
	}

	.menu {
		height: fit-content;
		top: 70px;
		overflow: hidden;
		position: absolute;
		z-index: 1000;
		width: 150px;
		left: 160px;
		transition: all 0.3s ease-out;

		animation: growDown 300ms ease-in-out forwards;
		transform-origin: top center;
		@keyframes growDown {
			0% {
				transform: scaleY(0);
			}
			80% {
				transform: scaleY(1.1);
			}
			100% {
				transform: scaleY(1);
			}
		}

		ul {
			width: 100%;
			margin: 0px;
			display: grid;
			gap: 3px;

			transition: all 0.3s ease-out;
			li {
				height: 40px;
				background-color: lightgray;
				list-style-type: none;
				padding: 5px 10px;
				border-radius: 5px;

				display: flex;
				align-items: center;

				white-space: nowrap;
				width: 100%;
				overflow: hidden;
				text-overflow: ellipsis;

				cursor: pointer;
				transition: all 0.3s ease-out;
			}

			li.menu__li-invited {
				background-color: lightgreen;
				transition: all 0.3s ease-out;
			}
		}
	}
`;
