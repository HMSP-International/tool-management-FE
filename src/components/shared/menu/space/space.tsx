import React, { useState } from 'react';
import { SpaceStyled } from './space.styled';
// modals
import CreateProjectModal from '../../../elements/modals/createProjectModal/createProjectModal';
import CreateWorkSpaceModal from '../../../../components/elements/modals/createWorkSpaceModal/createWorkSpaceModal';
import ShareWorkSpaceModal from '../../../../components/elements/modals/shareWorkSpaceModal/shareWorkSpaceModal';
import PutShareWorkSpaceModal from '../../../../components/elements/modals/putShareWorkSpaceModal/putShareWorkSpaceModal';
import PutWorkSpaceModal from '../../../elements/modals/putSpaceModal/putSpaceModal';
// components
import MySpace from './MySpace/mySpace';
import SpaceInvited from './spaceInvited/spaceInvited';
// interfaces
import { ISpace } from '../../../../slices/space/interfaces';

const Space: React.FC = () => {
	// state
	const [ nameSpace, setNameSpace ] = useState('');
	const [ showSpaceModal, setShowSpaceModal ] = useState(false);
	const [ spaceId, setSpaceId ] = useState('');
	const [ showProjectModal, setShowProjectModal ] = useState(false);
	const [ showShareModal, setShowShareModal ] = useState(false);

	const [ currentSpace, setCurrentSpace ] = useState<any>();
	const [ showPutSpaceModal, setShowPutSpaceModal ] = useState(false);
	const [ showPutShareModal, setShowPutShareModal ] = useState(false);

	const handleSubmitSpaceModal = (nameSpace: string) => {
		setShowSpaceModal(false);
		setShowShareModal(true);
		setNameSpace(nameSpace);
	};

	const handleBackShareModal = () => {
		setShowSpaceModal(true);
		setShowShareModal(false);
	};

	const handleBackPutShareModal = () => {
		setShowPutSpaceModal(true);
		setShowPutShareModal(false);
	};

	const handlePutSpaceModal = async (nameSpace: string) => {
		setShowPutSpaceModal(false);
		setShowPutShareModal(true);
		setNameSpace(nameSpace);
	};

	const handleOpenModel = (type: string, _id?: string, space?: ISpace) => {
		if (type === 'space') {
			setShowSpaceModal(true);
		}
		else if (type === 'project') {
			setSpaceId(_id || '');
			setShowProjectModal(true);
		}
		else if (type === 'editSpace') {
			setCurrentSpace(space);
			setShowPutSpaceModal(true);
		}
	};

	return (
		<React.Fragment>
			<SpaceStyled>
				<MySpace handleOpenModel={handleOpenModel} />

				<SpaceInvited handleOpenModel={handleOpenModel} />
			</SpaceStyled>

			{(showSpaceModal || showShareModal) && (
				<CreateWorkSpaceModal
					hidden={showSpaceModal}
					setHidden={setShowSpaceModal}
					onSubmit={handleSubmitSpaceModal}
				/>
			)}

			{showShareModal && (
				<ShareWorkSpaceModal
					hidden={showShareModal}
					setHidden={setShowShareModal}
					onBack={handleBackShareModal}
					nameSpace={nameSpace}
				/>
			)}

			{showProjectModal && (
				<CreateProjectModal hidden={showProjectModal} setHidden={setShowProjectModal} spaceId={spaceId} />
			)}

			{(showPutSpaceModal || showPutSpaceModal) && (
				<PutWorkSpaceModal
					hidden={showPutSpaceModal}
					setHidden={setShowPutSpaceModal}
					onSubmit={handlePutSpaceModal}
					currentSpace={currentSpace}
				/>
			)}

			{showPutShareModal && (
				<PutShareWorkSpaceModal
					hidden={showPutShareModal}
					setHidden={setShowPutShareModal}
					onBack={handleBackPutShareModal}
					currentSpace={currentSpace}
					nameSpace={nameSpace}
				/>
			)}
		</React.Fragment>
	);
};

export default Space;
