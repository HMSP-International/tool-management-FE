import ContainerPage from '../components/shared/containerPage/containerPage';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

// Import any actions required for transformations.
import { fill } from '@cloudinary/url-gen/actions/resize';

function HomePage () {
	const cld = new Cloudinary({
		cloud:
			{
				cloudName: 'hmsp-com',
			},
	});

	const myImage = cld.image('xoakr9khuguo3wzwxjdl');

	myImage.resize(fill().width(50).height(50));

	return (
		<ContainerPage title='HomePage'>
			<main>
				<AdvancedImage cldImg={myImage} />
			</main>
		</ContainerPage>
	);
}

export default HomePage;
