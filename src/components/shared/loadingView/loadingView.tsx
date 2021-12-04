import * as React from 'react';
import { Spin } from 'antd';
import { LoadingStyled } from './loading.styled';

const LoadingView: React.FC = () => {
	return (
		<LoadingStyled>
			<Spin tip='Loading...' />
		</LoadingStyled>
	);
};

export default LoadingView;
