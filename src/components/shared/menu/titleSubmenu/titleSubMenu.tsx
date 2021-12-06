import React from 'react';
import { TitleSubMenuStyled } from './titleSubMenu.styled';

interface IProps {
	title: string;
	type: string;
	onOpenModal(type: string, _id?: string): void;
	_id?: string;
	isCreated: boolean;
}

const TitleSubMenu: React.FC<IProps> = ({ title, onOpenModal, type, _id, isCreated }) => {
	return (
		<React.Fragment>
			<TitleSubMenuStyled className='submenu'>
				<div className='submenu__title'>{title}</div>
				{isCreated && (
					<div className='submenu__add' onClick={() => onOpenModal(type, _id)}>
						+
					</div>
				)}
			</TitleSubMenuStyled>
		</React.Fragment>
	);
};

export default TitleSubMenu;
