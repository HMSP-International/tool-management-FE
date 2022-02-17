import * as React from 'react';
import { ApolloError } from '@apollo/client';
import { ErrorStyled } from './error.styled';

interface IProps {
	error: ApolloError;
}

const ErrorView: React.FC<IProps> = ({ error }) => {
	return <ErrorStyled>{error.name}</ErrorStyled>;
};

export default ErrorView;
