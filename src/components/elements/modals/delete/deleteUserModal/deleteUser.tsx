import React from 'react';

// Styled Components
import { DeleteUserModalStyled } from './deleteUser.styled';
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	onSubmit(_id: string): void;
	user: {
		_id: string;
		email: string;
	};
}

const DeleteUserModal: React.FC<IProps> = ({ hidden, setHidden, onSubmit, user }) => {
	return (
		<DeleteUserModalStyled
			centered
			visible={hidden}
			footer={null}
			className='modal__delete-user-modal'
			onCancel={() => setHidden(false)}
		>
			<div className='delete-user-modal__container'>
				<div className='delete-user-modal__question'>Are you sure delete </div>
				<div className='delete-user-modal__name'>{user.email}</div>
				<div className='delete-user-modal__btn'>
					<button onClick={() => onSubmit(user._id)}>Delete</button>
				</div>
			</div>
		</DeleteUserModalStyled>
	);
};

export default DeleteUserModal;
