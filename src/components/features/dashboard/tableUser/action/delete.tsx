import React, { useState } from 'react';
import { Tag } from 'antd';
import DeleteUserModal from 'components/elements/modals/delete/deleteUserModal/deleteUser';
import { AiOutlineDelete } from 'react-icons/ai';

interface IProps {
	user: {
		_id: string;
		email: string;
	};
}

const DeleteAction: React.FC<IProps> = ({ user }) => {
	// state
	const [ showDeleteUserModal, setShowDeleteUserModal ] = useState(false);

	return (
		<React.Fragment>
			<Tag
				style={{ cursor: 'pointer', backgroundColor: 'red', borderRadius: '5px' }}
				onClick={() => setShowDeleteUserModal(true)}
			>
				<AiOutlineDelete />
			</Tag>

			{showDeleteUserModal && (
				<DeleteUserModal hidden={showDeleteUserModal} setHidden={setShowDeleteUserModal} user={user} />
			)}
		</React.Fragment>
	);
};

export default DeleteAction;
