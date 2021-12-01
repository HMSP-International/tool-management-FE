import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SpaceStyled } from './space.styled';
// helpers
import { convertProject } from '../../../../helpers/convertProject';
import STATUS from '../../../../constants/status';
// antd
import { Menu } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import TitleSubMenu from '../titleSubmenu/titleSubMenu';
// modals
import ProjectModal from '../modals/projectModal';
import WorkSpaceModal from '../modals/workSpaceModal';
import ShareModal from '../modals/shareModal';
// components
import LoadingView from '../../loadingView/loadingView';
import ErrorView from '../../errorView/errorView';
import ListModal from '../modals/listModal';
// graphql
import { useQuery, useMutation, ApolloError } from '@apollo/client';
import { GET_SPACES_QUERY } from '../graphql/queries';
import {
	CREATE_PROJECT_MUTATION,
	CREATE_SPACE_MUTATION,
	GET_PROJECTS_MUTATION,
} from '../graphql/mutations';
// interfaces
import { openNotification } from '../../../../helpers/notification';
import { handleApolloError } from '../../../../helpers/apolloError';
import { RootState } from '../../../../app/rootReducer';
import { IInitialStateSpace, ISpace } from '../../../../features/space/interfaces';
import { IInitialStateProject, IProject } from '../../../../features/project/interfaces';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getSpaces } from '../../../../features/space/slice';
import { getProjects, createProject } from '../../../../features/project/slice';

const { SubMenu } = Menu;

const Space: React.FC = () => {
	// graphql
	const { data: dataSpace, error, loading: loadingGetSpace } = useQuery(GET_SPACES_QUERY);
	const [ onCreateSpace, { loading: loadingCreateSpace } ] = useMutation(CREATE_SPACE_MUTATION);
	const [ onGetProjects, { loading: loadingGetProjects } ] = useMutation(GET_PROJECTS_MUTATION);
	const [ onCreateProject, { loading: loadingCreateProject } ] = useMutation(
		CREATE_PROJECT_MUTATION,
	);
	// state
	const [ nameSpace, setNameSpace ] = useState('');
	const [ showSpaceModal, setShowSpaceModal ] = useState(false);
	const [ showShareModal, setShowShareModal ] = useState(false);
	const [ showListModal, setShowListModal ] = useState(false);
	const [ showProjectModal, setShowProjectModal ] = useState(false);
	const [ spaceId, setSpaceId ] = useState('');
	// redux
	const dispatch = useDispatch();
	const spaceRedux: IInitialStateSpace = useSelector((state: RootState) => state.space);
	const projectRedux: IInitialStateProject = useSelector((state: RootState) => state.project);

	useEffect(
		() => {
			if (dataSpace) {
				const { getSpaces: spaces } = dataSpace;
				dispatch(getSpaces(spaces));
			}
		},
		[ dataSpace, dispatch ],
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

	if (loadingGetSpace || loadingCreateSpace || loadingGetProjects || loadingCreateProject) {
		return <LoadingView />;
	}
	if (error) return <ErrorView error={error} />;

	const handleSubmitSpaceModal = (nameSpace: string) => {
		setShowSpaceModal(false);
		setShowShareModal(true);
		setNameSpace(nameSpace);
	};

	const handleSubmitShareModal = async () => {
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
		} catch (error) {
			console.log(error);
			const showing = handleApolloError(error as ApolloError);
			openNotification(showing, true);
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

	const handleOpenModel = (type: string, _id?: string) => {
		if (type === 'space') {
			setShowSpaceModal(true);
		}
		else if (type === 'list') {
			setShowListModal(true);
		}
		else if (type === 'project') {
			setSpaceId(_id || '');
			setShowProjectModal(true);
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
								title={'Space'}
								type={'space'}
								onOpenModal={handleOpenModel}
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
			</SpaceStyled>

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
					nameSpace={nameSpace}
				/>
			)}

			{showListModal && (
				<ListModal
					hidden={showListModal}
					setHidden={setShowListModal}
					onSubmit={handleSubmitListModal}
				/>
			)}

			{showProjectModal && (
				<ProjectModal
					hidden={showProjectModal}
					setHidden={setShowProjectModal}
					onSubmit={handleSubmitProjectModal}
				/>
			)}
		</React.Fragment>
	);
};

export default Space;
