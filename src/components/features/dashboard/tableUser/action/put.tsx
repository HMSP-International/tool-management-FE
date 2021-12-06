import React, { useState } from 'react';
import { Tag } from 'antd';
import { IUser } from '../../../../../slices/dashboard/interfaces';

import PutUserDrawer from '../../../../elements/drawers/putUserDrawer/putUserDrawer';
// Redux
import { useDispatch } from 'react-redux';
import { updateInformationUser } from '../../../../../slices/dashboard/slice';

interface IProps {
	user: IUser;
}

const PutAction: React.FC<IProps> = ({ user }) => {
	const dispatch = useDispatch();
	const [ showUserDrawer, setShowUserDrawer ] = useState(false);

	const handlePutUser = (putUser: IUser, type: string) => {
		if (type === 'infomation') dispatch(updateInformationUser(putUser));
	};

	return (
		<React.Fragment>
			<Tag
				onClick={() => setShowUserDrawer(true)}
				style={{ cursor: 'pointer', backgroundColor: 'lightgreen' }}
			>
				Edit
			</Tag>

			{showUserDrawer && (
				<PutUserDrawer
					user={user}
					hidden={showUserDrawer}
					setHidden={setShowUserDrawer}
					onSubmit={handlePutUser}
				/>
			)}
		</React.Fragment>
	);
};

export default PutAction;
