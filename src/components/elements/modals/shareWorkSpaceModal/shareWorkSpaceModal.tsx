import React, { useState } from 'react';

// Styled Components
import { ShareModalStyled } from './shareWorkSpaceModal.styled';
// Components
import ListUserDrawer from '../../drawers/listUserDrawer/listUserDrawer';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(): void;
	onBack(): void;
	nameSpace: string;
}

const ShareModal: React.FC<IProps> = ({ hidden, setHidden, onSubmit, onBack, nameSpace }) => {
	const [ showListUserDrawer, setShowListUserDrawer ] = useState(false);

	return (
		<React.Fragment>
			<ShareModalStyled
				centered
				visible={hidden}
				footer={null}
				className='modal__share-modal'
			>
				<div className='share-modal__header'>
					<div className='share-modal__header__back' onClick={onBack}>
						{'<'}
					</div>
					<div className='share-modal__header__title'>{'Share ' + nameSpace}</div>
					<div className='share-modal__header__close' onClick={() => setHidden(false)}>
						{'X'}
					</div>
				</div>
				<div className='share-modal__body'>
					<div className='share-modal__option'>
						<div className='share-modal__option__private'>
							<img
								src='https://cdn.w600.comps.canstockphoto.com/private-stamp-eps-vector_csp6202764.jpg'
								alt=''
							/>
							<div>Private</div>
						</div>
					</div>
					<div className='share-modal__shared'>
						<div className='share-modal__shared__text'>Share only with:</div>
						<div className='share-modal__shared__img'>
							<div>
								<img
									src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
									alt=''
								/>
							</div>
						</div>
						<div
							className='share-modal__shared__add'
							onClick={() => setShowListUserDrawer(true)}
						>
							Add people
						</div>
					</div>
					<div className='share-modal__btn'>
						<button onClick={onSubmit}>Create Space</button>
					</div>
				</div>
			</ShareModalStyled>

			{showListUserDrawer && (
				<ListUserDrawer hidden={showListUserDrawer} setHidden={setShowListUserDrawer} />
			)}
		</React.Fragment>
	);
};

export default ShareModal;
