import React, { useState } from 'react';
import { TitleSubMenuStyled } from './titleSubMenu.styled';

import WorkSpaceModal from '../modals/workSpaceModal';
import ShareModal from '../modals/shareModal';
import ListModal from '../modals/listModal';

interface IProps {
	title: string;
	type: string;
}

const Header: React.FC<IProps> = ({ title, type }) => {
	const [ showSpaceModal, setShowSpaceModal ] = useState(false);
	const [ showShareModal, setShowShareModal ] = useState(false);
	const [ showListModal, setShowListModal ] = useState(false);

	const handleSubmitSpaceModal = () => {
		setShowSpaceModal(false);
		setShowShareModal(true);
	};

	const handleSubmitShareModal = () => {
		setShowShareModal(false);
	};
	const handleBackShareModal = () => {
		setShowSpaceModal(true);
		setShowShareModal(false);
	};

	const handleSubmitListModal = () => {
		setShowListModal(false);
	};

	const handleOpenModel = () => {
		if (type === 'space') {
			setShowSpaceModal(true);
		}
		else if (type === 'list') {
			setShowListModal(true);
		}
	};

	return (
		<React.Fragment>
			<TitleSubMenuStyled className='submenu'>
				<div className='submenu__title'>{title}</div>
				<div className='submenu__add' onClick={handleOpenModel}>
					+
				</div>
			</TitleSubMenuStyled>

			{(showSpaceModal || showShareModal) && (
				<WorkSpaceModal
					hidden={showSpaceModal}
					setHidden={setShowSpaceModal}
					onSubmit={handleSubmitSpaceModal}
				/>
			)}

			{showShareModal && (
				<ShareModal
					hidden={showShareModal}
					setHidden={setShowShareModal}
					onSubmit={handleSubmitShareModal}
					onBack={handleBackShareModal}
				/>
			)}

			{showListModal && (
				<ListModal
					hidden={showListModal}
					setHidden={setShowListModal}
					onSubmit={handleSubmitListModal}
				/>
			)}
		</React.Fragment>
	);
};

export default Header;
