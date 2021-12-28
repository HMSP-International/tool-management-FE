import * as React from 'react';
// components
import Manage from 'components/features/manage';
import ManageRoleproject from './[_id]/roles/index';
import ContainerPage from 'components/shared/containerPage/containerPage';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import LoadingView from 'components/shared/loadingView/loadingView';
import { useQuery } from '@apollo/client';
import { currentProject } from 'slices/project/slice';
import { IInitialStateProject, IProject } from 'slices/project/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PROJECT_BY_ID_QUERY } from 'apis/projects/queries';
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateUser } from 'slices/user/interfaces';

const ManagePage: React.FC = () => {
	const { currentProject: project }: IInitialStateProject = useSelector((state: RootState) => state.project);
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		loading: loadingGetProject,
		data: dataGetProject,
		error: errorGetProject,
	} = useQuery(GET_PROJECT_BY_ID_QUERY, {
		variables:
			{
				getProjectInput:
					{
						_projectId: params._id,
					},
			},
	});

	React.useEffect(
		() => {
			if (loadingGetProject) return;

			if (dataGetProject) {
				const project: IProject = dataGetProject.getProjectById;
				dispatch(currentProject(project));
			}
			else {
				navigate('notFound');
			}
		},
		[ dataGetProject, loadingGetProject, navigate, dispatch ],
	);

	if (loadingGetProject) {
		return <LoadingView />;
	}
	if (errorGetProject) {
		return <Navigate to='/notFound' />;
	}

	return (
		<ContainerPage title='Manage Task'>
			<Routes>
				{project.owner === userRedux.profile._id && <Route path='/roles' element={<ManageRoleproject />} />}
				<Route path='/' element={<Manage />} />
				<Route path='/*' element={<Navigate to='' />} />
			</Routes>
		</ContainerPage>
	);
};

export default ManagePage;
