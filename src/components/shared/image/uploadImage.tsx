import React from 'react';
import { Upload, Button, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';

const UploadImage: React.FC = () => {
	const props = {
		beforeUpload:
			(file: RcFile, FileList: RcFile[]) => {
				if (FileList.length >= 1) {
					return false;
				}

				return true;
			},
		onChange:
			(info: UploadChangeParam<UploadFile<any>>) => {
				console.log(info);
			},
		multiple: false,
		progress:
			{
				strokeColor:
					{
						'0%': '#108ee9',
						'100%': '#87d068',
					},
				strokeWidth: 3,
				format: (percent: number) => `${parseFloat(percent.toFixed(2))}%`,
			},
	};
	return (
		<Upload
			{...props}
			progress={{
				strokeColor:
					{
						'0%': '#108ee9',
						'100%': '#87d068',
					},
				strokeWidth: 3,
				format: () => `${parseFloat('0.1')}%`,
			}}
		>
			<Button icon={<UploadOutlined />}>Upload Your Avatar</Button>
		</Upload>
	);
};

export default UploadImage;
