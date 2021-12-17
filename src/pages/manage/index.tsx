import * as React from 'react';
// components
import Manage from '../../components/features/manage/manage';
import ContainerPage from '../../components/shared/containerPage/containerPage';

const ManagePage: React.FC = () => {
	return (
		<ContainerPage title='Manage'>
			<Manage />
		</ContainerPage>
	);
};

export default ManagePage;
