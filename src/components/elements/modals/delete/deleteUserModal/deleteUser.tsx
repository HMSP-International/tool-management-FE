import React from 'react';
// graphql
import { useMutation } from '@apollo/client';
import { DELETE_USER_MUTATION } from 'apis/users/mutations';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// helpers
import { fetchDataAndShowNotify } from 'global/helpers/graphql/fetchDataAndShowNotify';
// redux
import { useDispatch } from 'react-redux';
import { deleteUser } from 'slices/dashboard/slice';

// Styled Components
import { DeleteUserModalStyled } from './deleteUser.styled';
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	user: {
		_id: string;
		email: string;
	};
}

const DeleteUserModal: React.FC<IProps> = ({ hidden, setHidden, user }) => {
	// redux
	const dispatch = useDispatch();
	// graphql
	const [ onDeleteUser, { loading } ] = useMutation(DELETE_USER_MUTATION);

	if (loading) return <LoadingView />;

	const handleDeleteUser = async (_id: string) => {
		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onDeleteUser,
			message: 'Deleted user',
			variables:
				{
					deleteUserInput:
						{
							_id,
						},
				},
		});

		if (!isError) {
			dispatch(deleteUser(data));
			setHidden(false);
		}
	};

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
					<button onClick={() => handleDeleteUser(user._id)}>Delete</button>
				</div>
			</div>
		</DeleteUserModalStyled>
	);
};

export default DeleteUserModal;
