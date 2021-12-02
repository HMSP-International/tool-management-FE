import React, { useState } from 'react';
import { Tag } from 'antd';
import { IUser } from '../../../../../slices/dashboard/interfaces';

import PutUserDrawer from '../../drawer/putUser';
// Redux
import { useDispatch } from 'react-redux';
import { updateInformationUser } from '../../../../../slices/dashboard/slice';

interface IProps {
	user: IUser;
}

const PutAction: React.FC<IProps> = ({ user }) => {
	const dispatch = useDispatch();
	const [ showUserDrawer, setShowUserDrawer ] = useState(false);

	const handlePutUser = (putUser: IUser) => {
		dispatch(updateInformationUser(putUser));
	};

	return (
		<React.Fragment>
			<Tag
				onClick={() => setShowUserDrawer(true)}
				style={{ cursor: 'pointer', backgroundColor: 'lightgreen' }}
			>
				Edit
			</Tag>

			<PutUserDrawer
				user={user}
				hidden={showUserDrawer}
				setHidden={setShowUserDrawer}
				onSubmit={handlePutUser}
			/>
		</React.Fragment>
	);
};

export default PutAction;
