import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
// components
import Manage from 'components/features/manage';
import ManageRoleproject from './[_id]/roles/index';
import ContainerPage from 'components/shared/containerPage/containerPage';
import LoadingView from 'components/shared/loadingView/loadingView';
// graphql
import { useMutation, useQuery } from '@apollo/client';
import { GET_PROJECT_BY_ID_QUERY } from 'apis/projects/queries';
import { FIND_PATICIPANT_BY_PROJECT_AND_MEMBER_MUTATION } from 'apis/paticipants/mutations';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { currentProject } from 'slices/project/slice';
import { IInitialStateProject, IProject } from 'slices/project/interfaces';
import { currentPaticipant } from 'slices/paticipant/slice';
// interfaces
import { RootState } from 'global/redux/rootReducer';
import { IInitialStateUser } from 'slices/user/interfaces';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';

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
	} = useQuery(GET_PROJECT_BY_ID_QUERY, { variables: { getProjectInput: { _projectId: params._id } } });
	const [ onFindPaticipantByPAM, { loading: loadingFindPaticipantByPAM } ] = useMutation(
		FIND_PATICIPANT_BY_PROJECT_AND_MEMBER_MUTATION,
	);

	useEffect(
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

	useEffect(
		() => {
			if (loadingFindPaticipantByPAM) return;

			const getData = async () => {
				const { data, isError } = await fetchDataAndShowNotify({
					fnFetchData: onFindPaticipantByPAM,
					variables: { getPaticipantByProjectAndMemberInput: { _projectId: params._id } },
					isNotShowNotify: true,
				});

				if (isError) {
					dispatch(currentPaticipant(null));
				}
				else {
					dispatch(currentPaticipant(data));
				}
			};

			getData();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ onFindPaticipantByPAM, params._id ],
	);

	if (loadingGetProject || loadingFindPaticipantByPAM) {
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
