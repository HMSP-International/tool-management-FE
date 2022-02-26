import { Link } from 'react-router-dom';
import ContainerPage from '../components/shared/containerPage/containerPage';

function HomePage () {
	return (
		<ContainerPage title='HomePage'>
			<main>
				<Link to='task-doing/6218aed417c3ddcfb76fb0bd'>test</Link>
			</main>
		</ContainerPage>
	);
}

export default HomePage;
