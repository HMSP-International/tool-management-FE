import React from 'react';
import { TitleSpaceStyled } from './titleSpace.styled';

interface IProps {
	title: string;
}

const TitleSpace: React.FC<IProps> = ({ title }) => {
	return (
		<React.Fragment>
			<TitleSpaceStyled className='submenu'>
				<div className='submenu__title'>{title}</div>
			</TitleSpaceStyled>
		</React.Fragment>
	);
};

export default TitleSpace;
