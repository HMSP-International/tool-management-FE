import * as React from 'react';
import { useParams } from 'react-router-dom';
// components
import BoardTask from '../../components/features/boardTask/boardTask';
import ContainerPage from '../../components/shared/containerPage/containerPage';

const ManagePage: React.FC = () => {
	const params = useParams();

	console.log(params);

	return (
		<ContainerPage>
			<BoardTask />
		</ContainerPage>
	);
};

export default ManagePage;
