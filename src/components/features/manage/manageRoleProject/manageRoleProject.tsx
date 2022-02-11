import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
// component
import LoadingView from 'components/shared/loadingView/loadingView';
import UsersProject from 'components/elements/tables/usersProject/usersProject';
// Styled Components
import Container from '../container/container';
// redux
import { GET_USERS_BELONG_PROJECT_MUTAIION } from 'apis/paticipants/mutations';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { useDispatch } from 'react-redux';
import { getCollaboratorBeLongProject } from 'slices/paticipant/slice';
import { mainParamPage } from 'global/routes/page';

const Manage: React.FC = () => {
	const params = useParams();
	const dispatch = useDispatch();

	const [ onGetUserBeLongProject, { loading: loadingGetUserBelongProject } ] = useMutation(
		GET_USERS_BELONG_PROJECT_MUTAIION,
	);

	useEffect(
		() => {
			const fetchData = async () => {
				if (!loadingGetUserBelongProject) {
					const { data, isError } = await fetchDataAndShowNotify({
						fnFetchData: onGetUserBeLongProject,
						variables: { getUsersBelongProjectInput: { _projectId: params[mainParamPage.projectId] } },
					});

					if (!isError) {
						dispatch(getCollaboratorBeLongProject(data));
					}
				}
			};

			fetchData();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ params[mainParamPage.projectId], onGetUserBeLongProject ],
	);

	if (loadingGetUserBelongProject) return <LoadingView />;

	return (
		<Container>
			<UsersProject />
		</Container>
	);
};

export default Manage;
