import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Modal
import CreateNewUserDrawer from '../../elements/drawers/createUserDrawer/createUserDrawer';

// components
import ContainerPage from '../../shared/containerPage/containerPage';
import UsersDashboard from '../../elements/tables/usersDashboard/usersDashboard';
import { DashboardStyled } from './index.styled';
import LoadingView from '../../shared/loadingView/loadingView';

// redux
import { getUsers } from 'slices/dashboard/slice';
import { useDispatch } from 'react-redux';

// graphql
import { useMutation } from '@apollo/client';
import { GET_USERS_MUTATION } from 'apis/users/mutations';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';

const Dashboard: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [ showCreateUserDrawer, setShowCreateUserDrawer ] = useState(false);

	const [ onGetUsers, { loading } ] = useMutation(GET_USERS_MUTATION);

	useEffect(
		() => {
			const fetchUsers = async () => {
				const { data, isError } = await fetchDataAndShowNotify({
					fnFetchData: onGetUsers,
					isNotShowNotify: true,
				});

				if (!isError) {
					dispatch(getUsers(data));
				}
				else {
					navigate('/', { replace: true });
				}
			};

			fetchUsers();
		},
		[ onGetUsers, dispatch, navigate ],
	);

	if (loading) return <LoadingView />;

	return (
		<React.Fragment>
			<ContainerPage title={'Dashboard'}>
				<DashboardStyled>
					<div className='dashboard__add-new-user'>
						<button onClick={() => setShowCreateUserDrawer(true)}>Add new user</button>
					</div>
					<UsersDashboard />
				</DashboardStyled>
			</ContainerPage>

			{showCreateUserDrawer && (
				<CreateNewUserDrawer hidden={showCreateUserDrawer} setHidden={setShowCreateUserDrawer} />
			)}
		</React.Fragment>
	);
};

export default Dashboard;
