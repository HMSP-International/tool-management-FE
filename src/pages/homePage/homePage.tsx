import ContainerPage from '../../components/shared/containerPage/containerPage';
import { Link } from 'react-router-dom';

function HomePage () {
	return (
		<ContainerPage>
			<main>
				<Link to={'/manage/123'}>manage</Link>
			</main>
		</ContainerPage>
	);
}

export default HomePage;
