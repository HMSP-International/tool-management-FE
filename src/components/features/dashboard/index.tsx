import React, { useEffect, useState } from 'react';

// Modal
import CreateNewUserDrawer from '../../elements/drawers/createUserDrawer/createUserDrawer';

// components
import ContainerPage from '../../shared/containerPage/containerPage';
import TableUser from './tableUser/tableUser';
import { DashboardStyled } from './index.styled';
import LoadingView from '../../shared/loadingView/loadingView';

// interfaces
import { IUser } from '../../../slices/dashboard/interfaces';

// redux
import { createUser, getUsers } from '../../../slices/dashboard/slice';
import { useDispatch } from 'react-redux';

// graphql
import { useMutation } from '@apollo/client';
import { GET_USERS_MUTATION } from '../../../apis/users/mutations';

const Dashboard: React.FC = () => {
	const dispatch = useDispatch();
	const [ showCreateUserDrawer, setShowCreateUserDrawer ] = useState(false);

	const handleCreateNewUser = (newUser: IUser) => {
		dispatch(createUser(newUser));
	};

	const [ onGetUsers, { loading } ] = useMutation(GET_USERS_MUTATION);

	useEffect(
		() => {
			const fetchUsers = async () => {
				const { data } = await onGetUsers();

				const users: IUser[] = data.getUsers;

				dispatch(getUsers(users));
			};

			fetchUsers();
		},
		[ onGetUsers, dispatch ],
	);

	if (loading) return <LoadingView />;

	return (
		<React.Fragment>
			<ContainerPage title={'Dashboard'}>
				<DashboardStyled>
					<div className='dashboard__add-new-user'>
						<button onClick={() => setShowCreateUserDrawer(true)}>Add new user</button>
					</div>
					<TableUser />
				</DashboardStyled>
			</ContainerPage>

			{showCreateUserDrawer && (
				<CreateNewUserDrawer
					hidden={showCreateUserDrawer}
					setHidden={setShowCreateUserDrawer}
					onSubmit={handleCreateNewUser}
				/>
			)}
		</React.Fragment>
	);
};

export default Dashboard;