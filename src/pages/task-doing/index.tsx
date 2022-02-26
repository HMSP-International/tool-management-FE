import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
// components
import Manage from 'components/features/manage';
import ContainerPage from 'components/shared/containerPage/containerPage';
import LoadingView from 'components/shared/loadingView/loadingView';
// graphql
import { useMutation } from '@apollo/client';
import { GET_PROJECT_BY_ID_MUTATION } from 'apis/projects/mutations';
import {
	FIND_PATICIPANT_BY_PROJECT_AND_MEMBER_MUTATION,
	GET_USERS_BELONG_PROJECT_MUTAIION,
} from 'apis/paticipants/mutations';
// redux
import { useDispatch } from 'react-redux';
import { currentProject } from 'slices/project/slice';
import { getUserBeLongProject } from 'slices/paticipant/slice';
import { currentPaticipant } from 'slices/paticipant/slice';
import { getListsFormatted } from 'slices/taskList/slice';
// interfaces
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { IUserDashboard } from 'slices/dashboard/interfaces';

const TaskDoingPage: React.FC = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [ onGetProject, { loading: loadingGetProject } ] = useMutation(GET_PROJECT_BY_ID_MUTATION);
	const [ onFindPaticipantByPAM, { loading: loadingFindPaticipantByPAM } ] = useMutation(
		FIND_PATICIPANT_BY_PROJECT_AND_MEMBER_MUTATION,
	);
	const [ onGetUserBeLongProject, { loading: loadingGetUserBelongProject } ] = useMutation(
		GET_USERS_BELONG_PROJECT_MUTAIION,
	);

	useEffect(
		() => {
			if (loadingGetProject) return;

			const getData = async () => {
				const { data, isError } = await fetchDataAndShowNotify({
					fnFetchData: onGetProject,
					variables: { getProjectInput: { _projectId: params._projectId } },
					isNotShowNotify: true,
				});

				if (!isError) {
					dispatch(currentProject(data));
				}
				else {
					navigate('/');
				}
			};

			getData();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ dispatch, onGetProject, params._projectId ],
	);

	useEffect(
		() => {
			const fetchData = async () => {
				if (!loadingGetUserBelongProject) {
					const { data, isError } = await fetchDataAndShowNotify({
						fnFetchData: onGetUserBeLongProject,
						variables: { getUsersBelongProjectInput: { _projectId: params._projectId } },
					});

					if (!isError) {
						const users: IUserDashboard[] = data.map((user: any) => user._memberId);
						dispatch(getUserBeLongProject(users));
					}
				}
			};

			fetchData();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ onGetUserBeLongProject, dispatch, params._projectId ],
	);

	useEffect(() => {
		return () => {
			dispatch(getListsFormatted({}));
			dispatch(currentProject({}));
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		() => {
			if (loadingFindPaticipantByPAM) return;

			const getData = async () => {
				const { data, isError } = await fetchDataAndShowNotify({
					fnFetchData: onFindPaticipantByPAM,
					variables: { getPaticipantByProjectAndMemberInput: { _projectId: params._projectId } },
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
		[ dispatch, navigate, onFindPaticipantByPAM, params._projectId ],
	);

	if (loadingGetProject) {
		return <LoadingView />;
	}

	return (
		<ContainerPage title='Manage Task'>
			<Routes>
				<Route path='/' element={<Manage />} />
			</Routes>
		</ContainerPage>
	);
};

export default TaskDoingPage;
