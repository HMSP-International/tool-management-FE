import * as React from 'react';
import { LoadingStyled } from './loading.styled';

const LoadingView: React.FC = () => {
	return (
		<LoadingStyled>
			<span>Loading</span>
		</LoadingStyled>
	);
};

export default LoadingView;
