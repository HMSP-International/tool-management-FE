import React, { useState } from 'react';
import { Tag } from 'antd';
import DeleteCustomerModal from 'components/elements/modals/delete/deleteCustomerModal/deleteCustomer';
import { AiOutlineDelete } from 'react-icons/ai';

interface IProps {
	customer: {
		_id: string;
		email: string;
	};
}

const DeleteAction: React.FC<IProps> = ({ customer }) => {
	// state
	const [ showDeleteCustomerModal, setShowDeleteCustomerModal ] = useState(false);

	return (
		<React.Fragment>
			<Tag
				style={{ cursor: 'pointer', backgroundColor: 'red', borderRadius: '5px' }}
				onClick={() => setShowDeleteCustomerModal(true)}
			>
				<AiOutlineDelete />
			</Tag>

			{showDeleteCustomerModal && (
				<DeleteCustomerModal
					hidden={showDeleteCustomerModal}
					setHidden={setShowDeleteCustomerModal}
					customer={customer}
				/>
			)}
		</React.Fragment>
	);
};

export default DeleteAction;
