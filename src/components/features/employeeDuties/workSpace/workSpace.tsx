import React, { useContext } from 'react';
// 3rd Components
import { DragDropContext, DraggableLocation, Droppable } from 'react-beautiful-dnd';
import List from '../taskList/taskList';
import TaskListDD from 'components/elements/dropDown/taskListDD/taskListDD';
// Styled Components
import Container from '../container/container';
import WorkSpaceSocketHoc from './workSpace.socket.hoc';
// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { IInitialStateList } from 'slices/taskList/interfaces';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';
import { changeListInTaskSocket, getListsFormatted } from 'slices/taskList/slice';
// graphql
import { useMutation } from '@apollo/client';
import {
	PUT_LIST_OF_TASK_WITH_DRAG_AND_DROP_IN_ANOTHER_LIST_MUTATION,
	PUT_LIST_OF_TASK_WITH_DRAG_AND_DROP_IN1LIST_MUTATION,
} from 'apis/taskList/mutations';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
// socket
import { SocketContext } from 'socketIO/context';
import { taskEvents } from 'socketIO/events/taskEvents';
// redux
import { IInitialStateEmployeeDuties } from 'slices/employeeDuties/interfaces';

interface IProps {}

const WorkSpace: React.FC<IProps> = () => {
	const dispatch = useDispatch();
	const employeeDutiesRedux: IInitialStateEmployeeDuties = useSelector((state: RootState) => state.employeeDuties);

	const socket = useContext(SocketContext);
	const { lists: columns }: IInitialStateList = useSelector((state: RootState) => state.taskList);
	// graphql
	const [ onDragAndDropIn1List ] = useMutation(PUT_LIST_OF_TASK_WITH_DRAG_AND_DROP_IN1LIST_MUTATION);
	const [ onDragAndDropInAnotherList ] = useMutation(PUT_LIST_OF_TASK_WITH_DRAG_AND_DROP_IN_ANOTHER_LIST_MUTATION);
	// handle event
	const handleDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		const { source, destination, draggableId: taskId } = result;

		// start improve UX
		dispatch(
			changeListInTaskSocket({
				destination: { ...destination, _listId: destination.droppableId },
				_taskId: taskId,
				source: { ...source, _listId: source.droppableId },
			}),
		);
		// end improve UX

		if (source.droppableId !== destination.droppableId) {
			handleDragAndDropInAnotherList(destination, taskId);
		}
		else {
			handleDragAndDropIn1List(destination, taskId);
		}
	};

	const handleDragAndDropInAnotherList = async (destination: DraggableLocation, taskId: string) => {
		const oldColumns = { ...columns };

		const changeListOfTaskWithDragAndDropInAnotherListInput = {
			destination:
				{
					index: destination.index,
					_listId: destination.droppableId,
				},
			_taskId: taskId,
		};

		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onDragAndDropInAnotherList,
			variables: { changeListOfTaskWithDragAndDropInAnotherListInput },
		});

		if (!isError) {
			dispatch(changeListInTaskSocket(data));

			const input = {
				data,
				_projectId: employeeDutiesRedux.project.value || '',
			};
			socket.emit(taskEvents.handleDragAndDropInAnotherList, input);
		}
		else {
			dispatch(getListsFormatted(oldColumns));
		}
	};

	const handleDragAndDropIn1List = async (destination: DraggableLocation, taskId: string) => {
		const oldColumns = { ...columns };

		const changeListOfTaskWithDragAndDropIn1ListInput = {
			destination: { index: destination.index },
			_taskId: taskId,
		};

		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onDragAndDropIn1List,
			variables: { changeListOfTaskWithDragAndDropIn1ListInput },
		});

		if (!isError) {
			dispatch(changeListInTaskSocket(data));

			const input = {
				data,
				_projectId: employeeDutiesRedux.project.value || '',
			};
			socket.emit(taskEvents.handleDragAndDropIn1List, input);
		}
		else {
			dispatch(getListsFormatted(oldColumns));
		}
	};

	return (
		<WorkSpaceSocketHoc>
			<React.Fragment>
				<Container>
					<section className='workspace__body'>
						<DragDropContext onDragEnd={result => handleDragEnd(result)}>
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
		</WorkSpaceSocketHoc>
	);
};

export default WorkSpace;
