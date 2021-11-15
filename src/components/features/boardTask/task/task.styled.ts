import styled from 'styled-components';

export const TaskStyled = styled.div`
	background-color: rgb(199, 152, 82);
	padding: 0.5rem;
	margin-bottom: 1rem;

	cursor: move;
	font-size: ${props => props.theme.fontSize.big};
	background-color: ${props => props.theme.backgroundColor.primary};
`;
