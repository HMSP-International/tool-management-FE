import React, { useState } from 'react';
import { Tag } from 'antd';
import { AiOutlineEdit } from 'react-icons/ai';
import { ICustomerDashboard } from 'slices/dashboard/interfaces';

import PutCustomerDrawer from 'components/elements/drawers/put/putCustomerDrawer/putCustomerDrawer';
// Redux
import { useDispatch } from 'react-redux';
import { updateInformationUser } from 'slices/dashboard/slice';

interface IProps {
	customer: ICustomerDashboard;
}

const PutAction: React.FC<IProps> = ({ customer }) => {
	const dispatch = useDispatch();
	const [ showUserDrawer, setShowUserDrawer ] = useState(false);

	const handlePutUser = (putUser: ICustomerDashboard, type: string) => {
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
				<PutCustomerDrawer
					customer={customer}
					hidden={showUserDrawer}
					setHidden={setShowUserDrawer}
					onSubmit={handlePutUser}
				/>
			)}
		</React.Fragment>
	);
};

export default PutAction;
