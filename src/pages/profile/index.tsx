import * as React from 'react';
import ContainerPage from '../../components/shared/containerPage/containerPage';
import Profile from '../../components/features/profile/profile';

const ManagePage: React.FC = () => {
	return (
		<ContainerPage title='profile'>
			<Profile />
		</ContainerPage>
	);
};

export default ManagePage;
