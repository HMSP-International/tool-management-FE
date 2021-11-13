import * as React from 'react';
import { LoadingStyled } from './loading.styled';

interface IProps {
	test?: string;
}

const LoadingView: React.FC<IProps> = () => {
	return (
		<LoadingStyled>
			<span>Loading</span>
		</LoadingStyled>
	);
};

export default LoadingView;
