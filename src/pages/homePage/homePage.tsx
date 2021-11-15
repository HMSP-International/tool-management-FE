import ContainerPage from '../../components/shared/containerPage/containerPage';
import BoardTask from '../../components/features/boardTask/boardTask';
import { Link } from 'react-router-dom';

function HomePage () {
	return (
		<ContainerPage>
			<main>
				<Link to={'/auth/login'}>Login?</Link>
				<BoardTask />
			</main>
		</ContainerPage>
	);
}

export default HomePage;
