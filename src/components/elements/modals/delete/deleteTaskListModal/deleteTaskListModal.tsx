import React, { useContext } from 'react';
// graphql
import { useMutation } from '@apollo/client';
import { DELETE_LIST_MUTATION } from 'apis/taskList/mutations';
// redux
import { deleteTaskList } from 'slices/taskList/slice';
import { useDispatch } from 'react-redux';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// Styled Components
import { DeleteTaskListModalStyled } from './deleteTaskListModal.styled';
import { useParams } from 'react-router-dom';
// socket
import { SocketContext } from 'socketIO/context';
import { listEvents } from 'socketIO/events/listEvents';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	listId: string;
}

const DeleteTaskListModal: React.FC<IProps> = ({ hidden, setHidden, listId }) => {
	const [ onDeleteList, { loading } ] = useMutation(DELETE_LIST_MUTATION);
	const dispatch = useDispatch();

	const params = useParams();
	const socket = useContext(SocketContext);

	const hanldeDeleteListTask = async () => {
		const { data, isError } = await fetchDataAndShowNotify({
			fnFetchData: onDeleteList,
			variables:
				{
					deleteListInput:
						{
							_listId: listId,
						},
				},
		});

		if (!isError) {
			dispatch(deleteTaskList(data._id));
			socket.emit(listEvents.handleDeleteList, { data: data._id, _projectId: params._projectId || '' });
		}
	};

	if (loading) return <LoadingView />;

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
					All Task on this list will be deleted
				</div>
				<div className='delete-task-list-modal__btn'>
					<button onClick={hanldeDeleteListTask}>Delete</button>
				</div>
			</div>
		</DeleteTaskListModalStyled>
	);
};

export default DeleteTaskListModal;
