import React, { useContext } from 'react';
// Styled Components
import { ModalStyled } from './putTaskDetailModel.styled';
// components
import Comment from './comment/comment';
import NameTask from './nameTask/nameTask';
import DropDown from './dropDown/dropDown';
import Reporter from './reporter/reporter';
import Description from './description/description';
import CompletionTime from './completionTime/completionTime';
// graphql
import { useMutation } from '@apollo/client';
// redux
import { changeTask, deleteTasksInList } from 'slices/taskList/slice';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_ASSIGNEE_TASK_MUTATION, DELETE_TASKS_MUTATION } from 'apis/task/mutations';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// interfaces
import { RootState } from 'global/redux/rootReducer';
import { ITask } from 'slices/task/interfaces';
import { SocketContext } from 'socketIO/context';
import { useParams } from 'react-router-dom';
// socket
import { taskEvents } from 'socketIO/events/taskEvents';
import Assignee from './assignee/assignee';
import Timestamp from './timestamp/timestamp';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const PutTaskDetail: React.FC<IProps> = ({ hidden, setHidden }) => {
	const socket = useContext(SocketContext);
	const params = useParams();
	// redux
	const dispatch = useDispatch();
	const task: ITask = useSelector((state: RootState) => state.task.currentTask[0]);
	// graphql
	const [ onChangeAssignee ] = useMutation(CHANGE_ASSIGNEE_TASK_MUTATION);
	const [ onDeleteTaskName ] = useMutation(DELETE_TASKS_MUTATION);

	// event
	const handleAssignee = async (newAssigne: string) => {
		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onChangeAssignee,
			variables:
				{
					changeAssigneeInput:
						{
							_taskId: task._id,
							assignee: newAssigne,
						},
				},
		});

		if (!isError) {
			dispatch(changeTask(data));
			socket.emit(taskEvents.changeAssingeeTask, { data, _projectId: params._projectId || '' });
		}
	};

	const handleDeleteTask = async () => {
		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onDeleteTaskName,
			variables:
				{
					deleteTaskInput:
						{
							_taskIds: [ task._id ],
						},
				},
		});

		if (!isError) {
			dispatch(deleteTasksInList(data));
			socket.emit(taskEvents.handleDeleteTask, { data, _projectId: params._projectId || '' });
			setHidden(false);
		}
	};

	return (
		<React.Fragment>
			<ModalStyled centered visible={hidden} width={'90vw'} footer={null} className='modal__task-detail'>
				<section className='task-detail__container'>
					<div className='task-detail__header'>
						<div className='task-detail__header__tag'>T - {task.order + 1}</div>
						<div className='task-detail__header__close' onClick={() => setHidden(false)}>
							X
						</div>
					</div>

					<div className='task-detail__description'>
						<NameTask task={task} />

						<Description task={task} />

						<Comment task={task} />
					</div>

					<div className='task-detail__assign'>
						<DropDown currentList={task._listId} taskId={task._id} />

						<div className='task-detail__assign__detail'>
							<div className='title'>Details</div>

							<div className='table'>
								<Assignee task={task} handleAssignee={handleAssignee} />
								<Reporter />
							</div>
						</div>

						<div className='task-detail__assign__completion-time'>
							<CompletionTime completionTime={task.completionTime} taskId={task._id} />
						</div>

						<hr style={{ marginTop: '20px', borderBottom: 'none', borderTop: '1px solid lightgray' }} />

						<div className='task-detail__assign__timestamp'>
							<Timestamp task={task} />
						</div>
						<div className='task-detail__group-btn'>
							<div className='task-detail__assign__btn-delete'>
								<button onClick={handleDeleteTask}>Delete</button>
							</div>
							<div className='task-detail__assign__btn'>
								<button onClick={() => setHidden(false)}>Update</button>
							</div>
						</div>
					</div>
				</section>
			</ModalStyled>
		</React.Fragment>
	);
};

export default PutTaskDetail;
