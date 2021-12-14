import React from 'react';
import { useParams } from 'react-router-dom';
// graphql
import { useMutation } from '@apollo/client';
import { DELETE_LIST_MUTATION } from 'apis/taskList/mutations';
// interfaces
import { IList } from 'slices/taskList/interfaces';
// redux
import { deleteTaskList } from 'slices/taskList/slice';
import { useDispatch } from 'react-redux';
// helpers
import { openNotification } from 'global/helpers/notification';
import { handleApolloError } from 'global/helpers/apolloError';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// Styled Components
import { DeleteTaskListModalStyled } from './deleteProjectModal.styled';
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const DeleteTaskListModal: React.FC<IProps> = ({ hidden, setHidden }) => {
	// const [ onDeleteList, { loading } ] = useMutation(DELETE_LIST_MUTATION);
	const dispatch = useDispatch();
	const params = useParams();

	// if (loading) return <LoadingView />;

	return (
		<DeleteTaskListModalStyled
			centered
			visible={hidden}
			footer={null}
			className='modal__delete-task-list-modal'
			onCancel={() => setHidden(false)}
		>
			<div className='delete-task-list-modal__container'>
				<div className='delete-task-list-modal__question'>Are you sure delete </div>
				<div className='delete-task-list-modal__name' style={{ color: 'red' }}>
					All Task and List on this project will be deleted
				</div>
				<div className='delete-task-list-modal__btn'>
					<button>Delete</button>
				</div>
			</div>
		</DeleteTaskListModalStyled>
	);
};

export default DeleteTaskListModal;
