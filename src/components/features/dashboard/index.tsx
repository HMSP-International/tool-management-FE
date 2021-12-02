import React, { useState } from 'react';

// Modal
import CreateNewUserDrawer from './drawer/createNewUser';

// components
import ContainerPage from '../../shared/containerPage/containerPage';
import TableUser from './tableUser/tableUser';
import { DashboardStyled } from './index.styled';

// interfaces
import { IUser } from '../../../slices/dashboard/interfaces';

// redux
import { createUser } from '../../../slices/dashboard/slice';
import { useDispatch } from 'react-redux';

const Dashboard: React.FC = () => {
	const dispatch = useDispatch();
	const [ showCreateUserDrawer, setShowCreateUserDrawer ] = useState(false);

	const handleCreateNewUser = (newUser: IUser) => {
		dispatch(createUser(newUser));
	};

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

			<CreateNewUserDrawer
				hidden={showCreateUserDrawer}
				setHidden={setShowCreateUserDrawer}
				onSubmit={handleCreateNewUser}
			/>
		</React.Fragment>
	);
};

export default Dashboard;
