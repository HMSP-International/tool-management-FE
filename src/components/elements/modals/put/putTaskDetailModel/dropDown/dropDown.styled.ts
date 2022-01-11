import styled from 'styled-components';

export const DropDownStyled = styled.div`
	width: fit-content;
	height: 50px;
	&:hover {
		.dropdown-list {
			opacity: 1;
			visibility: visible;
			z-index: 999999;
		}
	}

	.dropdown-select {
		background-color: lightblue;
		padding: 10px;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 18px;
		cursor: pointer;
		color: white;

		&:hover {
			background-color: #6db9d1;
		}
	}

	.dropdown-list {
		border-radius: 4px;
		background-color: white;
		position: relative;
		top: 5px;
		left: 0;
		right: 0;
		border-radius: 5px;
		overflow: hidden;

		opacity: 0;
		visibility: hidden;
		transition: opacity 0.3s linear, visibility 0.3s linear;
	}

	.dropdown-list__item {
		padding: 10px;
		font-size: 16px;
		background-color: lightblue;
		border: 1px solid white;
		cursor: pointer;
		transition: all: 0.3s ease-out;
		color: white;

		&:hover {
			background-color: white;
			color: #6db9d1;
			border: 1px solid #6db9d1;
		}
	}

	.dropdown-list__item-active {
		padding: 10px;
		font-size: 16px;
		background-color: white;
		border: 1px solid #6db9d1;
		cursor: pointer;
		transition: all: 0.3s ease-out;
		color: #6db9d1;
	}
`;
