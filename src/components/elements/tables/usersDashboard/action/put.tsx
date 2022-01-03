import React, { useState } from 'react';
import { Tag } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';
import { IUser } from 'slices/dashboard/interfaces';

import PutUserDrawer from 'components/elements/drawers/putUserDrawer/putUserDrawer';
// Redux
import { useDispatch } from 'react-redux';
import { updateInformationUser } from 'slices/dashboard/slice';

interface IProps {
	user: IUser;
}

const PutAction: React.FC<IProps> = ({ user }) => {
	const dispatch = useDispatch();
	const [ showUserDrawer, setShowUserDrawer ] = useState(false);

	const handlePutUser = (putUser: IUser, type: string) => {
		if (type === 'information') {
			dispatch(updateInformationUser(putUser));
		}
	};

	return (
		<React.Fragment>
			<Tag
				onClick={() => setShowUserDrawer(true)}
				style={{ cursor: 'pointer', backgroundColor: 'lightgreen', borderRadius: '5px' }}
			>
				<AiOutlineEdit />
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