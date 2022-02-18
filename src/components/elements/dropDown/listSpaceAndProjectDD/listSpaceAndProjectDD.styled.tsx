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

	.cont_drobpdown_menu {
		position: relative;
		float: left;
		width: 100%;
		background-color: #fff;
		box-shadow: 0px 2px 20px -2px rgba(0, 0, 0, 0.3);
		margin-top: 10px;
		border-radius: 3px;
		opacity: 1;
		transition: all 0.5s;
	}

	.cont_drobpdown_menu ul > li {
		list-style: none;
		margin-left: 5px;
		margin-top: 5px;
		border-left: 5px solid #eee;
		width: 100%;
		display: block;
		transition: all 0.3s;
	}

	.cont_drobpdown_menu ul > li:hover {
		border-left: 5px solid #6992fe;
	}

	.cont_drobpdown_menu ul > li:hover > a {
		color: #6992fe;
	}

	.cont_drobpdown_menu ul > li:nth-child(2) {
		border: none;
	}

	.cont_drobpdown_menu ul > li > a {
		position: relative;
		display: block;
		width: 90%;
		padding-top: 10px;
		padding-bottom: 10px;
		text-decoration: none;
		color: #c4d0de;
		transition: all 0.5s;
	}

	.cont_drobpdown_menu ul > li > hr {
		width: 75%;
		height: 0px;
		color: #123455;
		background-color: #123455;
		border: 1px solid #eee;
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

	.disable {
		transition: all 0.5s;
		opacity: 0;
		transform: translate(0px, 10px);
	}

	.disable > ul > li {
		transform: translate(0px, 10px);
		opacity: 0;
	}

	.active {
		opacity: 1;
		transform: translate(0px, 0px);
	}

	.active > ul > li {
		transition-delay: 0.5s;
		transform: translate(0px, 0px);
		opacity: 1;
	}
`;
