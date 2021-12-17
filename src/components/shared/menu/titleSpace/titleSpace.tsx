import React from 'react';
import { TitleSpaceStyled } from './titleSpace.styled';
import { AiOutlineEdit } from 'react-icons/ai';
import { ISpace } from 'slices/space/interfaces';

interface IProps {
	title: string;
	type: string;
	onOpenModal(type: string, _id?: string, currentSpace?: ISpace): void;
	_id?: string;
	isCreated: boolean;
	space?: ISpace;
}

const TitleSpace: React.FC<IProps> = ({ title, onOpenModal, type, _id, isCreated, space }) => {
	return (
		<React.Fragment>
			<TitleSpaceStyled className='submenu'>
				<div className='submenu__title'>{title}</div>
				{isCreated && (
					<div className='submenu__icons'>
						{type === 'project' && (
							<div className='submenu__icons__edit'>
								<AiOutlineEdit onClick={() => onOpenModal('editSpace', _id, space)} />
							</div>
						)}
						<div className='submenu__icons__add' onClick={() => onOpenModal(type, _id)}>
							+
						</div>
					</div>
				)}
			</TitleSpaceStyled>
		</React.Fragment>
	);
};

export default TitleSpace;
