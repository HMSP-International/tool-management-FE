import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// 3rd Components
import { DragDropContext, DraggableLocation, Droppable } from 'react-beautiful-dnd';
import List from '../taskList/taskList';
import TaskListDD from 'components/elements/dropDown/taskListDD/taskListDD';
// Styled Components
import Container from '../container/container';
// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { IInitialStateList, ITaskList } from 'slices/taskList/interfaces';
import { IInitialStateAuth } from 'slices/auth/interfaces';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';
import { changeListInTaskSocket } from 'slices/taskList/slice';
// graphql
// import { useMutation } from '@apollo/client';
// import {
// 	PUT_LIST_OF_TASK_WITH_DRAG_AND_DROP_IN_ANOTHER_LIST_MUTATION,
// 	PUT_LIST_OF_TASK_WITH_DRAG_AND_DROP_IN1LIST_MUTATION,
// } from 'apis/taskList/mutations';
// helpers
// import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// socket
import { socket } from 'global/socket/connection';

interface IProps {}

const WorkSpace: React.FC<IProps> = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const { lists: columns }: IInitialStateList = useSelector((state: RootState) => state.taskList);
	// graphql
	const authRedux: IInitialStateAuth = useSelector((state: RootState) => state.auth);
	// const [ onDragAndDropIn1List ] = useMutation(PUT_LIST_OF_TASK_WITH_DRAG_AND_DROP_IN1LIST_MUTATION);
	// const [ onDragAndDropInAnotherList ] = useMutation(PUT_LIST_OF_TASK_WITH_DRAG_AND_DROP_IN_ANOTHER_LIST_MUTATION);
	// handle event
	const handleDragEnd = (result: DropResult, columns: ITaskList) => {
		if (!result.destination) return;
		const { source, destination, draggableId: taskId } = result;

		if (source.droppableId !== destination.droppableId) {
			handleDragAndDropInAnotherList(destination, taskId, source);
		}
		else {
			handleDragAndDropIn1List(destination, taskId, source);
		}
	};

	useEffect(
		() => {
			socket.emit('connectionToProject', { data: { _projectId: params._id || '' } });

			socket.on('handleDragAndDropIn1List', (data: any) => {
				console.log(data);
				dispatch(changeListInTaskSocket(data));
			});

			socket.on('handleDragAndDropInAnotherList', (data: any) => {
				console.log(data);
				dispatch(changeListInTaskSocket(data));
			});

			return () => {
				socket.emit('disconnectionToProject', { data: { _projectId: params._id || '' } });
			};
		},
		[ dispatch, params._id ],
	);

	const handleDragAndDropInAnotherList = async (
		destination: DraggableLocation,
		taskId: string,
		source: DraggableLocation,
	) => {
		const input = {
			data:
				{
					destination:
						{
							index: destination.index,
							_listId: destination.droppableId,
						},
					_taskId: taskId,
				},
			jwt: authRedux.jwt,
			_projectId: params._id || '',
		};

		socket.emit('handleDragAndDropInAnotherList', input);

		// start improve UX
		dispatch(
			changeListInTaskSocket({
				destination: { ...destination, _listId: destination.droppableId },
				_taskId: taskId,
				source: { ...source, _listId: source.droppableId },
			}),
		);
		// end improve UX
	};

	const handleDragAndDropIn1List = async (
		destination: DraggableLocation,
		taskId: string,
		source: DraggableLocation,
	) => {
		const input = {
			data:
				{
					destination: { index: destination.index },
					_taskId: taskId,
				},
			jwt: authRedux.jwt,
			_projectId: params._id || '',
		};

		socket.emit('handleDragAndDropIn1List', input);

		// start improve UX
		dispatch(
			changeListInTaskSocket({
				destination: { ...destination, _listId: destination.droppableId },
				_taskId: taskId,
				source: { ...source, _listId: source.droppableId },
			}),
		);
		// end improve UX
	};

	return (
		<React.Fragment>
			<Container>
				<section className='workspace__body'>
					<DragDropContext onDragEnd={result => handleDragEnd(result, columns)}>
						{Object.entries(columns).map(([ columnId, columnData ]) => (
							<Droppable key={columnId} droppableId={columnId}>
								{(provided, snapshot) => {
									return (
										<div className='wrap-list'>
											<div className='wrap-list__title'>
												<div className='wrap-list__title__left'>
													<div className='wrap-list__title__left__name'>
														{columnData.name}
													</div>
													{'  '}
													<div className='wrap-list__title__left__number'>
														{columnData.items.length}
													</div>
												</div>
												<div className='wrap-list__title__right'>
													<div className='wrap-list__title__right__icon'>
														<TaskListDD listId={columnId} />
													</div>
												</div>
											</div>
											<List
												snapshot={snapshot}
												provided={provided}
												columnData={columnData}
												listId={columnId}
											/>
										</div>
									);
								}}
							</Droppable>
						))}
					</DragDropContext>
				</section>
			</Container>
		</React.Fragment>
	);
};

export default WorkSpace;
