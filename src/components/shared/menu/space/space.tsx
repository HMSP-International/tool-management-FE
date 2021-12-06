import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpaceStyled } from './space.styled';
// helpers
import { convertProject } from '../../../../global/helpers/convertProject';
import { openNotification } from '../../../../global/helpers/notification';
import { handleApolloError } from '../../../../global/helpers/apolloError';
// contants
import STATUS from '../../../../global/constants/status';
// antd
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import TitleSubMenu from '../titleSubmenu/titleSubMenu';
// modals
import CreateProjectModal from '../../../../components/elements/modals/createProjectModal/createProjectModal';
import CreateWorkSpaceModal from '../../../../components/elements/modals/createWorkSpaceModal/createWorkSpaceModal';
import ShareWorkSpaceModal from '../../../../components/elements/modals/shareWorkSpaceModal/shareWorkSpaceModal';
import PutSpaceModal from '../../../elements/modals/putSpaceModal/putSpaceModal';
// components
import LoadingView from '../../loadingView/loadingView';
import ErrorView from '../../errorView/errorView';
import CreateListModal from '../../../../components/elements/modals/createListModal/createListModal';
// graphql
import { useQuery, useMutation, ApolloError } from '@apollo/client';
import { GET_SPACES_QUERY, GET_INVITED_SPACES_QUERY } from '../../../../apis/spaces/queries';
import { CREATE_SPACE_MUTATION, INVITE_SPACES_MUTATION } from '../../../../apis/spaces/mutations';
import {
	CREATE_PROJECT_MUTATION,
	GET_PROJECTS_MUTATION,
	GET_PROJECTS_BY_COLLABORATORS_MUTATION,
} from '../../../../apis/projects/mutations';
// interfaces
import { RootState } from '../../../../global/redux/rootReducer';
import { IInitialStateSpace, ISpace } from '../../../../slices/space/interfaces';
import { IInitialStateProject, IProject } from '../../../../slices/project/interfaces';
import { IUser } from 'slices/dashboard/interfaces';
import { ICollaborator, IInitialStateCollaborator } from 'slices/collaborator/interfaces';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getSpaces } from '../../../../slices/space/slice';
import {
	getProjects,
	createProject,
	getProjectsFromCollaborator,
} from '../../../../slices/project/slice';
import { getCollaborators } from '../../../../slices/collaborator/slice';

const { SubMenu } = Menu;

const Space: React.FC = () => {
	// graphql
	const {
		data: dataSpace,
		errorInvitedSpace: errorGetSpace,
		loading: loadingGetSpace,
	} = useQuery(GET_SPACES_QUERY);
	const { data: dataInvitedSpace, errorInvitedSpace, loading: loadingGetInvitedSpace } = useQuery(
		GET_INVITED_SPACES_QUERY,
	);
	const [ onCreateSpace, { loading: loadingCreateSpace } ] = useMutation(CREATE_SPACE_MUTATION);
	const [ onGetProjects, { loading: loadingGetProjects } ] = useMutation(GET_PROJECTS_MUTATION);
	const [
		onGetProjectsByCollaborators,
		{ loading: loadingGetProjectsByCollaborators },
	] = useMutation(GET_PROJECTS_BY_COLLABORATORS_MUTATION);
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
	const [ showPutProjectModal, setPutShowProjectModal ] = useState(false);
	const [ spaceId, setSpaceId ] = useState('');
	// redux
	const dispatch = useDispatch();
	const spaceRedux: IInitialStateSpace = useSelector((state: RootState) => state.space);
	const projectRedux: IInitialStateProject = useSelector((state: RootState) => state.project);
	const collaboratorRedux: IInitialStateCollaborator = useSelector(
		(state: RootState) => state.collaborator,
	);

	useEffect(
		() => {
			if (dataSpace) {
				const { getSpaces: spaces } = dataSpace;
				dispatch(getSpaces(spaces));
			}
			if (dataInvitedSpace) {
				const { getInvitedSpaces: invitedSpaces } = dataInvitedSpace;
				dispatch(getCollaborators(invitedSpaces));
			}
		},
		[ dataSpace, dispatch, dataInvitedSpace ],
	);

	useEffect(
		() => {
			if (spaceRedux.status === STATUS.SUCCESS) {
				const getProject = async () => {
					const { getSpaces } = dataSpace;
					const spaces: string[] = getSpaces.map((space: ISpace) => space._id);
					const { data } = await onGetProjects({
						variables:
							{
								getProjectsInput:
									{
										_spacesId: spaces,
									},
							},
					});

					const projects: IProject[] = data.getProjects;
					const newProjects = convertProject(projects);

					dispatch(getProjects(newProjects));
				};

				getProject();
			}
		},
		[ dataSpace, spaceRedux, onGetProjects, dispatch ],
	);

	useEffect(
		() => {
			if (collaboratorRedux.status === STATUS.SUCCESS) {
				const getProjectByCollaborators = async () => {
					const { getInvitedSpaces } = dataInvitedSpace;

					const spaces: string[] = getInvitedSpaces.map(
						(collaborator: ICollaborator) => collaborator._workSpaceId._id,
					);

					const { data } = await onGetProjectsByCollaborators({
						variables:
							{
								getProjectsInput:
									{
										_spacesId: spaces,
									},
							},
					});

					const projects: IProject[] = data.getProjectsByCollaborator;
					const newProjects = convertProject(projects);

					dispatch(getProjectsFromCollaborator(newProjects));
				};

				getProjectByCollaborators();
			}
		},
		[ dataInvitedSpace, collaboratorRedux, onGetProjectsByCollaborators, dispatch ],
	);

	if (
		loadingGetSpace ||
		loadingCreateSpace ||
		loadingGetProjects ||
		loadingCreateProject ||
		loadingInviteSpace ||
		loadingGetInvitedSpace ||
		loadingGetProjectsByCollaborators
	) {
		return <LoadingView />;
	}
	if (errorGetSpace) return <ErrorView error={errorGetSpace} />;
	if (errorInvitedSpace) return <ErrorView error={errorInvitedSpace} />;

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
				<Menu mode='inline' inlineCollapsed={false} key={'menu'}>
					<SubMenu
						key='space'
						icon={<AppstoreOutlined />}
						title={
							<TitleSubMenu
								title={'Your Space'}
								type={'space'}
								onOpenModal={handleOpenModel}
								isCreated={true}
							/>
						}
					>
						{spaceRedux.spaces.map(space => {
							let keys = Object.keys(projectRedux.projects);
							keys = keys.filter(key => key === space._id);

							return (
								<SubMenu
									key={space._id}
									icon={<AppstoreOutlined />}
									title={
										<TitleSubMenu
											title={space.name}
											_id={space._id}
											type={'project'}
											onOpenModal={handleOpenModel}
											isCreated={true}
											space={space}
										/>
									}
								>
									{keys.map(key =>
										projectRedux.projects[key].map(project => (
											<Menu.Item
												key={project._id}
												icon={<AppstoreOutlined />}
											>
												<Link to={`/manage/${project._id}`}>
													{project.name}
												</Link>
											</Menu.Item>
										)),
									)}
								</SubMenu>
							);
						})}
					</SubMenu>
				</Menu>

				<Menu mode='inline' inlineCollapsed={false} key={'menu2'}>
					<SubMenu
						key='space'
						icon={<AppstoreOutlined />}
						title={
							<TitleSubMenu
								title={'Invited Space'}
								type={'space'}
								onOpenModal={handleOpenModel}
								isCreated={false}
							/>
						}
					>
						{collaboratorRedux.collaborators.map(collaborator => {
							const { _workSpaceId: space } = collaborator;

							let keys = Object.keys(projectRedux.projectsFromCollaborator);
							keys = keys.filter(key => key === space._id);

							return (
								<SubMenu
									key={space._id}
									icon={<AppstoreOutlined />}
									title={
										<TitleSubMenu
											title={space.name}
											_id={space._id}
											type={'project'}
											onOpenModal={handleOpenModel}
											isCreated={false}
										/>
									}
								>
									{keys.map(key =>
										projectRedux.projectsFromCollaborator[key].map(project => (
											<Menu.Item
												key={project._id}
												icon={<AppstoreOutlined />}
											>
												<Link to={`/manage/${project._id}`}>
													{project.name}
												</Link>
											</Menu.Item>
										)),
									)}
								</SubMenu>
							);
						})}
					</SubMenu>
				</Menu>
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
