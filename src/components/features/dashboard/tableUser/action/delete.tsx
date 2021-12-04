import React, { useState } from 'react';
import { Tag } from 'antd';

// helpers
import { openNotification } from '../../../../../helpers/notification';
import { handleApolloError } from '../../../../../helpers/apolloError';
// components
import DeleteUserModal from '../../../../elements/modals/deleteUserModal/deleteUser';
import LoadingView from '../../../../shared/loadingView/loadingView';
// graphql
import { ApolloError, useMutation } from '@apollo/client';
import { DELETE_USER_MUTATION } from '../../graphql/mutations';
// redux
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../../../../slices/dashboard/slice';

interface IProps {
	user: {
		_id: string;
		email: string;
	};
}

const DeleteAction: React.FC<IProps> = ({ user }) => {
	// redux
	const dispatch = useDispatch();
	// state
	const [ showDeleteUserModal, setShowDeleteUserModal ] = useState(false);
	// graphql
	const [ onDeleteUser, { loading } ] = useMutation(DELETE_USER_MUTATION);

	if (loading) return <LoadingView />;

	const handleDeleteUser = async (_id: string) => {
		try {
			const { data } = await onDeleteUser({
				variables:
					{
						deleteUserInput:
							{
								_id,
							},
					},
			});

			dispatch(deleteUser(data.deleteUser));

			setShowDeleteUserModal(false);

			openNotification({
				title: 'Susscessfully',
				extensions: [ 'Deleted user' ],
			});
		} catch (error) {
			const showing = handleApolloError(error as ApolloError);
			openNotification(showing, true);
		}
	};

	return (
		<React.Fragment>
			<Tag
				style={{ cursor: 'pointer', backgroundColor: 'red' }}
				onClick={() => setShowDeleteUserModal(true)}
			>
				Delete
			</Tag>

			{showDeleteUserModal && (
				<DeleteUserModal
					hidden={showDeleteUserModal}
					setHidden={setShowDeleteUserModal}
					onSubmit={handleDeleteUser}
					user={user}
				/>
			)}
		</React.Fragment>
	);
};

export default DeleteAction;
