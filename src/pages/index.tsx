// import { useEffect } from 'react';
import ContainerPage from '../components/shared/containerPage/containerPage';

function HomePage () {
	// const [ number, setNumber ] = useState(0);

	const updateData = () => {
		// socket.emit('increaseNumber', number + 1);
	};

	// socket.on('sendNumber', (data: number) => {
	// 	console.log(data);
	// 	setNumber(data);
	// });

	// socket.on('increaseNumber', (data: number) => {
	// 	console.log(data);
	// 	setNumber(data);
	// });

	return (
		<ContainerPage title='HomePage'>
			<main onClick={updateData}>HOME PAGE {0}</main>
		</ContainerPage>
	);
}

export default HomePage;
