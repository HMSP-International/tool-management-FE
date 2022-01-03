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
}

const Image: React.FC<IProps> = ({ w, h, public_id, styles = {}, tooltip, placement }) => {
	const cld = new Cloudinary({
		cloud:
			{
				cloudName: 'hmsp-com',
			},
	});

	const myImage = cld.image(public_id);

	myImage.resize(fill().width(w).height(h));

	return (
		<Tooltip placement={placement || 'top'} title={tooltip || ''}>
			<AdvancedImage cldImg={myImage} style={styles} />
		</Tooltip>
	);
};

export default Image;
