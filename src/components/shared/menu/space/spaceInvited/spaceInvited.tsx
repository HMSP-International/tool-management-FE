import React, { useEffect } from 'react';
// antd
import { AppstoreOutlined } from '@ant-design/icons';
import TitleSubMenu from '../../titleSubmenu/titleSubMenu';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
// interfaces
import { IInitialStateProject, IProject } from 'slices/project/interfaces';
import { ICollaborator, IInitialStateCollaborator } from 'slices/collaborator/interfaces';
import { ISpace } from 'slices/space/interfaces';
// graphql
import { useMutation, useQuery } from '@apollo/client';
import { GET_INVITED_SPACES_QUERY } from 'apis/spaces/queries';
import { GET_PROJECTS_BY_COLLABORATORS_MUTATION } from 'apis/projects/mutations';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
import ErrorView from 'components/shared/errorView/errorView';
// status
import STATUS from 'global/constants/status';
import { convertProject } from 'global/helpers/convertProject';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsFromCollaborator } from 'slices/project/slice';
import { RootState } from 'global/redux/rootReducer';
import { getCollaborators } from 'slices/collaborator/slice';

const { SubMenu } = Menu;

interface IProps {
	handleOpenModel(type: string, _id?: string, space?: ISpace): void;
}

const SpaceInvited: React.FC<IProps> = ({ handleOpenModel }) => {
	const projectRedux: IInitialStateProject = useSelector((state: RootState) => state.project);
	const collaboratorRedux: IInitialStateCollaborator = useSelector(
		(state: RootState) => state.collaborator,
	);

	const { data: dataInvitedSpace, errorInvitedSpace, loading: loadingGetInvitedSpace } = useQuery(
		GET_INVITED_SPACES_QUERY,
	);
	const [
		onGetProjectsByCollaborators,
		{ loading: loadingGetProjectsByCollaborators },
	] = useMutation(GET_PROJECTS_BY_COLLABORATORS_MUTATION);

	const dispatch = useDispatch();

	useEffect(
		() => {
			if (dataInvitedSpace) {
				const { getInvitedSpaces: invitedSpaces } = dataInvitedSpace;
				dispatch(getCollaborators(invitedSpaces));
			}
		},
		[ dispatch, dataInvitedSpace ],
	);

	useEffect(
		() => {
			if (collaboratorRedux.status === STATUS.SUCCESS) {
				const getProjectByCollaborators = async () => {
					const { getInvitedSpaces } = dataInvitedSpace;

					const spaces: string[] = getInvitedSpaces.map(
						(collaborator: ICollaborator) => collaborator._workSpaceId._id,
					);

					console.log(getInvitedSpaces);

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

	if (loadingGetInvitedSpace || loadingGetProjectsByCollaborators) {
		return <LoadingView />;
	}
	if (errorInvitedSpace) return <ErrorView error={errorInvitedSpace} />;

	return (
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
									<Menu.Item key={project._id} icon={<AppstoreOutlined />}>
										<Link to={`/manage/${project._id}`}>{project.name}</Link>
									</Menu.Item>
								)),
							)}
						</SubMenu>
					);
				})}
			</SubMenu>
		</Menu>
	);
};

export default SpaceInvited;