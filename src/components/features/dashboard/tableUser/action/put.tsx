import * as React from 'react';
import { Tag } from 'antd';
import { IUser } from '../../../../../features/dashboard/interfaces';

interface IProps {
	user: IUser;
}

const PutAction: React.FC<IProps> = () => {
	return <Tag style={{ cursor: 'pointer', backgroundColor: 'lightgreen' }}>Edit</Tag>;
};

export default PutAction;
