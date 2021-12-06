import React, { useState } from 'react';
import { SpaceStyled } from './space.styled';
// helpers
import { convertProject } from '../../../../global/helpers/convertProject';
import { openNotification } from '../../../../global/helpers/notification';
import { handleApolloError } from '../../../../global/helpers/apolloError';
// modals
import CreateProjectModal from '../../../../components/elements/modals/createProjectModal/createProjectModal';
import CreateWorkSpaceModal from '../../../../components/elements/modals/createWorkSpaceModal/createWorkSpaceModal';
import ShareWorkSpaceModal from '../../../../components/elements/modals/shareWorkSpaceModal/shareWorkSpaceModal';
import PutSpaceModal from '../../../elements/modals/putSpaceModal/putSpaceModal';
// components
import LoadingView from '../../loadingView/loadingView';
import CreateListModal from '../../../../components/elements/modals/createListModal/createListModal';
import MySpace from './MySpace/mySpace';
import SpaceInvited from './spaceInvited/spaceInvited';
// graphql
import { useMutation, ApolloError } from '@apollo/client';
import { CREATE_SPACE_MUTATION, INVITE_SPACES_MUTATION } from '../../../../apis/spaces/mutations';
import { CREATE_PROJECT_MUTATION } from '../../../../apis/projects/mutations';
// interfaces
import { ISpace } from '../../../../slices/space/interfaces';
import { IProject } from '../../../../slices/project/interfaces';
import { IUser } from 'slices/dashboard/interfaces';
// redux
import { useDispatch } from 'react-redux';
import { getSpaces } from '../../../../slices/space/slice';
import { createProject } from 'slices/project/slice';

const Space: React.FC = () => {
	// graphql
	const [ onCreateSpace, { loading: loadingCreateSpace } ] = useMutation(CREATE_SPACE_MUTATION);
	const [ onCreateProject, { loading: loadingCreateProject } ] = useMutation(
		CREATE_PROJECT_MUTATION,
	);
	const [ onInviteSpace, { loading: loadingInviteSpace } ] = useMutation(INVITE_SPACES_MUTATION);
	// state
	const [ nameSpace, setNameSpace ] = useState('');
	const [ showSpaceModal, setShowSpaceModal ] = useState(false);
	const [ showShareModal, setShowShareModal ] = useState(false);
	const [ showListModal, setShowListModal ] = useState(false);
	const [ showProjectModal, setShowProjectModal ] = useState(false);
	const [ currentSpace, setCurrentSpace ] = useState<any>();
	const [ spaceId, setSpaceId ] = useState('');
	const [ showPutProjectModal, setPutShowProjectModal ] = useState(false);
	// redux
	const dispatch = useDispatch();

	if (loadingCreateSpace || loadingCreateProject || loadingInviteSpace) {
		return <LoadingView />;
	}

	const handleSubmitSpaceModal = (nameSpace: string) => {
		setShowSpaceModal(false);
		setShowShareModal(true);
		setNameSpace(nameSpace);
	};

	const handleSubmitShareModal = async (inviteUsers: IUser[]) => {
		try {
			const { data: { createSpace: spaces } } = await onCreateSpace({
				variables:
					{
						createSpaceInput:
							{
								name: nameSpace,
							},
					},
			});

			dispatch(getSpaces(spaces));
			setShowShareModal(false);

			openNotification({
				title: 'Susscessfully',
				extensions: [ 'Created space' ],
			});

			const newSpace = spaces.filter((space: ISpace) => space.name === nameSpace);
			console.log(newSpace);
			handleVerifyInviteSpace(inviteUsers, newSpace);
		} catch (error) {
			console.log(error);
			const showing = handleApolloError(error as ApolloError);
			openNotification(showing, true);
		}
	};

	const handleVerifyInviteSpace = async (inviteUsers: IUser[], newSpace: ISpace[]) => {
		if (newSpace.length >= 1) {
			const _workSpaceId = newSpace[0]._id;
			const role = 'MEMBER';

			for (let i = 0; i < inviteUsers.length; i++) {
				await onInviteSpace({
					variables:
						{
							inviteSpaceInput:
								{
									_workSpaceId,
									role,
									_memberId: inviteUsers[i]._id,
								},
						},
				});
			}
		}
	};

	const handleBackShareModal = () => {
		setShowSpaceModal(true);
		setShowShareModal(false);
	};

	const handleSubmitListModal = () => {
		setShowListModal(false);
	};

	const handleSubmitProjectModal = async (nameProject: string) => {
		try {
			const { data } = await onCreateProject({
				variables:
					{
						createProjectInput:
							{
								name: nameProject,
								_spaceId: spaceId,
							},
					},
			});

			const projects: IProject[] = data.createProject;
			const newProjects = convertProject(projects);
			dispatch(createProject(newProjects));

			setShowProjectModal(false);

			openNotification({
				title: 'Susscessfully',
				extensions: [ 'Created project' ],
			});
		} catch (error) {
			const showing = handleApolloError(error as ApolloError);
			openNotification(showing, true);
		}
	};

	const handlePutProjectModal = async (nameProject: string) => {
		// try {
		// 	const { data } = await onCreateProject({
		// 		variables:
		// 			{
		// 				createProjectInput:
		// 					{
		// 						name: nameProject,
		// 						_spaceId: spaceId,
		// 					},
		// 			},
		// 	});
		// 	const projects: IProject[] = data.createProject;
		// 	const newProjects = convertProject(projects);
		// 	dispatch(createProject(newProjects));
		// 	setShowProjectModal(false);
		// 	openNotification({
		// 		title: 'Susscessfully',
		// 		extensions: [ 'Created project' ],
		// 	});
		// } catch (error) {
		// 	const showing = handleApolloError(error as ApolloError);
		// 	openNotification(showing, true);
		// }
	};

	const handleOpenModel = (type: string, _id?: string, space?: ISpace) => {
		if (type === 'space') {
			setShowSpaceModal(true);
		}
		else if (type === 'list') {
			setShowListModal(true);
		}
		else if (type === 'project') {
			setSpaceId(_id || '');
			if (!space) {
				setShowProjectModal(true);
			}
			else {
				setCurrentSpace(space);
				setPutShowProjectModal(true);
			}
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
					onSubmit={handleSubmitShareModal}
					onBack={handleBackShareModal}
					nameSpace={nameSpace}
				/>
			)}

			{showListModal && (
				<CreateListModal
					hidden={showListModal}
					setHidden={setShowListModal}
					onSubmit={handleSubmitListModal}
				/>
			)}

			{showProjectModal && (
				<CreateProjectModal
					hidden={showProjectModal}
					setHidden={setShowProjectModal}
					onSubmit={handleSubmitProjectModal}
				/>
			)}

			{showPutProjectModal && (
				<PutSpaceModal
					hidden={showPutProjectModal}
					setHidden={setPutShowProjectModal}
					onSubmit={handlePutProjectModal}
					currentSpace={currentSpace}
				/>
			)}
		</React.Fragment>
	);
};

export default Space;
