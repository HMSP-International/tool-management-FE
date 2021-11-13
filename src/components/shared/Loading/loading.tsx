import * as React from 'react';
import { LoadingStyled } from './loading.styled';

interface IProps {
	test?: string;
}

const Loading: React.FC<IProps> = () => {
	return <LoadingStyled>Loading</LoadingStyled>;
};

export default Loading;
