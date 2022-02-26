import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';

// Import any actions required for transformations.
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';

interface IProps {
	w: number;
	h: number;
	public_id: string;
	styles?: object;
	tooltip?: string;
	placement?: TooltipPlacement;
	onClick?: () => void;
}

const Image: React.FC<IProps> = ({ w, h, public_id, styles = {}, tooltip, placement, onClick }) => {
	const cld = new Cloudinary({
		cloud:
			{
				cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
			},
	});

	const handleOnClickImage = () => {
		if (onClick) {
			console.log('clicked');
			onClick();
		}
	};

	const myImage = cld.image(public_id);

	myImage.resize(fill().width(w).height(h));

	return (
		<Tooltip placement={placement || 'top'} title={tooltip || ''}>
			<AdvancedImage cldImg={myImage} style={styles} onClick={handleOnClickImage} />
		</Tooltip>
	);
};

export default Image;
