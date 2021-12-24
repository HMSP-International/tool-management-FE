import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

// Import any actions required for transformations.
import { fill } from '@cloudinary/url-gen/actions/resize';

interface IProps {
	w: number;
	h: number;
	public_id: string;
	styles?: object;
}

const Image: React.FC<IProps> = ({ w, h, public_id, styles = {} }) => {
	const cld = new Cloudinary({
		cloud:
			{
				cloudName: 'hmsp-com',
			},
	});

	const myImage = cld.image(public_id);

	myImage.resize(fill().width(w).height(h));

	return <AdvancedImage cldImg={myImage} style={styles} />;
};

export default Image;
