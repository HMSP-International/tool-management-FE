import React from 'react';
// Styled Components
import { ModalStyled } from './putTaskDetailModel.styled';
// components
import Comment from './comment/comment';
import NameTask from './nameTask/nameTask';
import DropDown from './dropDown/dropDown';
import Image from 'components/shared/image/image';
import Description from './description/description';
import ListUserBeLongProjectDD from 'components/elements/dropDown/listUserBeLongProjectDD/listUserBeLongProjectDD';
// graphql
import { useMutation } from '@apollo/client';
// redux
import { changeTask, deleteTasksInList } from 'slices/taskList/slice';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_ASSIGNEE_TASK_MUTATION, DELETE_TASKS_MUTATION } from 'apis/task/mutations';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { dateMongooseToDateJs } from 'helpers/date/dateMongooseToDateJs';
// interfaces
import { IInitialStateUser } from 'slices/user/interfaces';
import { RootState } from 'global/redux/rootReducer';
import { ITask } from 'slices/task/interfaces';

interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
}

const PutTaskDetail: React.FC<IProps> = ({ hidden, setHidden }) => {
	// redux
	const dispatch = useDispatch();
	const userRedux: IInitialStateUser = useSelector((state: RootState) => state.user);
	const task: ITask = useSelector((state: RootState) => state.task.currentTask[0]);
	// graphql
	const [ onChangeAssignee ] = useMutation(CHANGE_ASSIGNEE_TASK_MUTATION);
	const [ onDeleteTaskName ] = useMutation(DELETE_TASKS_MUTATION);

	// event
	const handleAssignee = async (newAssigne: any) => {
		if (task.assignee === null || newAssigne !== task.assignee._id) {
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

			console.log('current task', task);
			console.log('new task', data);

			if (!isError) {
				dispatch(changeTask(data));
			}
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
			setHidden(false);
		}
	};

	return (
		<React.Fragment>
			<ModalStyled centered visible={hidden} width={'90vw'} footer={null} className='modal__task-detail'>
				<section className='task-detail__container'>
					<div className='task-detail__header'>
						{/* <div className='task-detail__header__tag'>MT - 6</div> */}
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
						{/* <div className='task-detail__assign__list-selection'>
							<select name='list' defaultValue='todo'>
								<option value='todo'>To Do</option>
								<option value='doing'>Doing</option>
								<option value='review'>Review</option>
								<option value='done'>Done</option>
							</select>
						</div> */}

						<div className='task-detail__assign__detail'>
							<div className='title'>Details</div>

							<div className='table'>
								<div className='assignee'>
									<div className='left'>Assignee</div>
									<div className='right'>
										<div className='right__avt'>
											<ListUserBeLongProjectDD
												onChangeUser={handleAssignee}
												assignee={task.assignee}
											/>
										</div>
										<div className='right__name'>{''}</div>
									</div>
								</div>
								<div className='reporter'>
									<div className='left'>Reporter</div>
									<div className='right'>
										<div className='right__avt'>
											<Image
												public_id={userRedux.profile.avatar}
												w={40}
												h={40}
												styles={{ borderRadius: '100rem' }}
												tooltip={userRedux.profile.email}
												placement={'rightBottom'}
											/>
										</div>
										<div className='right__name'>{userRedux.profile.displayName}</div>
									</div>
								</div>
							</div>
						</div>

						<div className='task-detail__assign__timestamp'>
							<div className='created'>Created {dateMongooseToDateJs(task.timestamp.createAt)}</div>
							<div className='updated'>Updated {dateMongooseToDateJs(task.timestamp.updateAt)}</div>
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
