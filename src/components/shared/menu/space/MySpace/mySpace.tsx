import React, { useEffect } from 'react';
import { AppstoreOutlined } from '@ant-design/icons';
import { AiOutlineProject, AiFillCalendar } from 'react-icons/ai';
import TitleSubMenu from '../../titleSubmenu/titleSubMenu';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
// components
import ErrorView from '../../../errorView/errorView';
import LoadingView from 'components/shared/loadingView/loadingView';
// interfaces
import { IInitialStateSpace, ISpace } from 'slices/space/interfaces';
import { IInitialStateProject, IProject } from 'slices/project/interfaces';
import { RootState } from 'global/redux/rootReducer';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getSpaces } from 'slices/space/slice';
import { getProjects } from 'slices/project/slice';
// status
import STATUS from 'global/constants/status';
// graphql
import { useMutation, useQuery } from '@apollo/client';
import { GET_SPACES_QUERY } from 'apis/spaces/queries';
import { GET_PROJECTS_MUTATION } from 'apis/projects/mutations';
// helpers
import { convertProject } from 'global/helpers/convertProject';

const { SubMenu } = Menu;

interface IProps {
	handleOpenModel(type: string, _id?: string, space?: ISpace): void;
}

const MySpace: React.FC<IProps> = ({ handleOpenModel }) => {
	const dispatch = useDispatch();
	const spaceRedux: IInitialStateSpace = useSelector((state: RootState) => state.space);
	const projectRedux: IInitialStateProject = useSelector((state: RootState) => state.project);

	const { data: dataSpace, errorInvitedSpace: errorGetSpace, loading: loadingGetSpace } = useQuery(GET_SPACES_QUERY);
	const [ onGetProjects, { loading: loadingGetProjects } ] = useMutation(GET_PROJECTS_MUTATION);

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
			if (dataSpace) {
				const { getSpaces: spaces } = dataSpace;
				dispatch(getSpaces(spaces));
			}
		},
		[ dataSpace, dispatch ],
	);

	if (loadingGetSpace || loadingGetProjects) {
		return <LoadingView />;
	}
	if (errorGetSpace) return <ErrorView error={errorGetSpace} />;

	return (
		<React.Fragment>
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
								icon={<AiFillCalendar />}
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
										<Menu.Item key={project._id} icon={<AiOutlineProject />}>
											<Link to={`/manage/${project._id}`}>{project.name}</Link>
										</Menu.Item>
									)),
								)}
							</SubMenu>
						);
					})}
				</SubMenu>
			</Menu>
		</React.Fragment>
	);
};

export default MySpace;
