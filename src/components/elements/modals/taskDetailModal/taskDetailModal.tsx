import React, { useEffect, useRef, useState } from 'react';
import { ITask } from 'slices/taskList/interfaces';
// Styled Components
import { ModalStyled } from './taskDetailModal.styled';
// components
import LoadingView from 'components/shared/loadingView/loadingView';
// graphql
import { CREATE_TASK_MUTATION, DELETE_TASKS_MUTATION } from 'apis/task/mutations';
import { useMutation } from '@apollo/client';
// redux
import { useDispatch } from 'react-redux';
import { createTaskInList, deleteTasksInList } from 'slices/taskList/slice';
// helpers
import { openNotification } from 'global/helpers/notification';
import { handleApolloError } from 'global/helpers/apolloError';
// interfaces
interface IProps {
	hidden: boolean;
	setHidden(value: boolean): void;
	task?: ITask;
	listId: string;
}

interface IStateComment {
	img: string;
	content: string;
}

interface IStateCurrentTask {
	nameTask: string;
	descriptions: string[];
	comments: IStateComment[];
	createAt: string;
	updateAt: string;
	reporter: string;
	assigne: string;
}

const TaskDetail: React.FC<IProps> = ({ hidden, setHidden, task, listId }) => {
	// redux
	const dispatch = useDispatch();
	// graphql
	const [ onCreateTask, { loading: loadingCreateTask } ] = useMutation(CREATE_TASK_MUTATION);
	const [ onDeleteTasks, { loading: loadingDeleteTasks } ] = useMutation(DELETE_TASKS_MUTATION);

	const [ currentTask, setCurrentTask ] = useState<IStateCurrentTask>({
		nameTask: '',
		descriptions: [],
		comments: [],
		createAt: '1 min ago',
		updateAt: '1 min ago',
		reporter: '',
		assigne: '',
	});
	const nameTaskRef = useRef<HTMLInputElement>(null);

	useEffect(
		() => {
			if (task) {
				setCurrentTask({
					nameTask: 'User UX',
					descriptions: [ 'Create User', 'Delete User' ],
					comments:
						[
							{ img: '', content: 'Done Bor' },
							{ img: '', content: 'Ok Bor' },
							{ img: '', content: 'No Bor' },
						],
					createAt: '10 days ago',
					updateAt: '2 days ago',
					reporter: 'Le Van Pon',
					assigne: 'Pham Duc Huy',
				});
			}
		},
		[ task ],
	);

	if (loadingCreateTask || loadingDeleteTasks) return <LoadingView />;

	// event
	const handleChangeTaskName = async (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;
		setCurrentTask(preState => ({ ...preState, nameTask: value }));
	};

	const handleCreateTask = async () => {
		if (task === undefined) {
			if (nameTaskRef && nameTaskRef.current) {
				try {
					const { data } = await onCreateTask({
						variables:
							{
								createTaskInput:
									{
										_listId: listId,
										name: nameTaskRef.current.value,
									},
							},
					});

					// CREATE TASKs

					const resTask: ITask = data.createTask;
					dispatch(createTaskInList(resTask));

					const showing = {
						title: 'Susscess',
						extensions: [ 'Created Task' ],
					};
					openNotification(showing);
				} catch (error) {
					const showing = handleApolloError(error);
					openNotification(showing, true);
				}
			}
		}
	};

	const handleDeleteTask = async () => {
		if (task) {
			try {
				const { data } = await onDeleteTasks({
					variables:
						{
							deleteTaskInput:
								{
									_taskIds: [ task._id ],
								},
						},
				});

				// DELETE TASKs
				const resTask: ITask[] = data.deleteTasks;
				dispatch(deleteTasksInList(resTask));

				setHidden(false);

				const showing = {
					title: 'Susscess',
					extensions: [ 'Deleted Task' ],
				};
				openNotification(showing);
			} catch (error) {
				const showing = handleApolloError(error);
				openNotification(showing, true);
			}
		}
	};

	return (
		<React.Fragment>
			<ModalStyled centered visible={hidden} width={'90vw'} footer={null} className='modal__task-detail'>
				<section className='task-detail__container'>
					<div className='task-detail__header'>
						<div className='task-detail__header__tag'>MT - 6</div>
						<div className='task-detail__header__close' onClick={() => setHidden(false)}>
							X
						</div>
					</div>

					<div className='task-detail__description'>
						<div className='name-task'>
							<input
								type='text'
								value={currentTask.nameTask}
								placeholder='Enter your task Name...'
								onChange={handleChangeTaskName}
								ref={nameTaskRef}
								name='taskName'
							/>
							<button onClick={handleCreateTask}>{task ? 'Edit' : 'Create Task'}</button>
						</div>
						<div className='des-task'>
							<div className='des-task__content'>Description</div>
							<input type='text' placeholder='Add ad description...' />
							<button>Add</button>
							<ul className='des-task__des-list'>
								{currentTask.descriptions.map((name, index) => <li key={index}>{name}</li>)}
							</ul>
						</div>
						<div className='comment'>
							<div className='comment__title'>Comments</div>
							<div className='comment__group-input'>
								{currentTask.comments.map((comment, index) => (
									<div className='comment__group-input__item' key={index}>
										<div className='comment__group-input__item__avt'>
											<img
												src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
												alt=''
											/>
										</div>
										<div className='comment__group-input__item__input'>
											<input type='text' value={comment.content} />
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div className='task-detail__assign'>
						<div className='task-detail__assign__list-selection'>
							<select name='list' defaultValue='todo'>
								<option value='todo'>To Do</option>
								<option value='doing'>Doing</option>
								<option value='review'>Review</option>
								<option value='done'>Done</option>
							</select>
						</div>

						<div className='task-detail__assign__detail'>
							<div className='title'>Details</div>

							<div className='table'>
								<div className='assignee'>
									<div className='left'>Assigne</div>
									<div className='right'>
										<div className='right__avt'>
											<img
												src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
												alt=''
											/>
										</div>
										<div className='right__name'>{currentTask.assigne}</div>
									</div>
								</div>
								<div className='reporter'>
									<div className='left'>Reporter</div>
									<div className='right'>
										<div className='right__avt'>
											<img
												src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
												alt=''
											/>
										</div>
										<div className='right__name'>{currentTask.reporter}</div>
									</div>
								</div>
							</div>
						</div>

						<div className='task-detail__assign__timestamp'>
							<div className='created'>Created {currentTask.updateAt}</div>
							<div className='updated'>Updated {currentTask.createAt}</div>
						</div>

						{task !== undefined && (
							<div className='task-detail__assign__btn'>
								<button onClick={handleDeleteTask}>Delete Task</button>
							</div>
						)}
					</div>
				</section>
			</ModalStyled>
		</React.Fragment>
	);
};

export default TaskDetail;
