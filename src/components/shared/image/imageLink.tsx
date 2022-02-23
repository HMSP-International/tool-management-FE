import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import React from 'react';

// Import any actions required for transformations.
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';
import { useNavigate } from 'react-router-dom';

interface IProps {
	w: number;
	h: number;
	public_id: string;
	styles?: object;
	tooltip?: string;
	placement?: TooltipPlacement;
	link: string;
}

const ImageLink: React.FC<IProps> = ({ w, h, public_id, styles = {}, tooltip, placement, link }) => {
	const navigate = useNavigate();
	const cld = new Cloudinary({
		cloud:
			{
				cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
			},
	});

	const myImage = cld.image(public_id);

	myImage.resize(fill().width(w).height(h));

	const handleGoToPage = () => {
		navigate(link);
	};

	return (
		<Tooltip placement={placement || 'top'} title={tooltip || ''}>
			<AdvancedImage cldImg={myImage} style={styles} onClick={handleGoToPage} />
		</Tooltip>
	);
};

export default ImageLink;
