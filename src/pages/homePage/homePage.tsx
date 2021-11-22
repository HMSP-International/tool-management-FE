import ContainerPage from '../../components/shared/containerPage/containerPage';
import { Link } from 'react-router-dom';

function HomePage () {
	return (
		<ContainerPage>
			<main>
				<Link to={'/auth/login'}>Login?</Link>
				<br />
				<Link to={'/manage'}>manage</Link>
			</main>
		</ContainerPage>
	);
}

export default HomePage;
