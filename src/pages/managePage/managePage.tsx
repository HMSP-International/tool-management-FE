import * as React from 'react';
import BoardTask from '../../components/features/boardTask/boardTask';
import ContainerPage from '../../components/shared/containerPage/containerPage';

const ManagePage: React.FC = () => {
	return (
		<ContainerPage>
			<BoardTask />
		</ContainerPage>
	);
};

export default ManagePage;
