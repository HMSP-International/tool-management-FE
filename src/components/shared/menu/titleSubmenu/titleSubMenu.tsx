import React from 'react';
import { TitleSubMenuStyled } from './titleSubMenu.styled';

interface IProps {
	title: string;
	type: string;
	onOpenModal(type: string): void;
}

const Header: React.FC<IProps> = ({ title, onOpenModal, type }) => {
	return (
		<React.Fragment>
			<TitleSubMenuStyled className='submenu'>
				<div className='submenu__title'>{title}</div>
				<div className='submenu__add' onClick={() => onOpenModal(type)}>
					+
				</div>
			</TitleSubMenuStyled>
		</React.Fragment>
	);
};

export default Header;
