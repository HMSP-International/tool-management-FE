import React from 'react';
// 3rd Components
import { DragDropContext, DraggableLocation, Droppable } from 'react-beautiful-dnd';
import List from '../taskList/taskList';
import TaskListDD from 'components/elements/dropDown/taskListDD/taskListDD';
// Styled Components
import Container from '../container/container';
// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { IInitialStateList, ITaskList } from 'slices/taskList/interfaces';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';
import { changeListInTaskSocket, getListsFormatted } from 'slices/taskList/slice';
// graphql
import { useMutation } from '@apollo/client';
import { PUT_LIST_OF_TASK_WITH_DRAG_AND_DROP_IN1LIST_MUTATION } from 'apis/taskList/mutations';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';

interface IProps {}

const WorkSpace: React.FC<IProps> = () => {
	const dispatch = useDispatch();
	const { lists: columns }: IInitialStateList = useSelector((state: RootState) => state.taskList);
	// graphql
	const [ onDragAndDropIn1List ] = useMutation(PUT_LIST_OF_TASK_WITH_DRAG_AND_DROP_IN1LIST_MUTATION);
	// handle event
	const handleDragEnd = (result: DropResult, columns: ITaskList) => {
		if (!result.destination) return;
		const { source, destination, draggableId: taskId } = result;

		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId];
			const destColumn = columns[destination.droppableId];
			const sourceItems = [ ...sourceColumn.items ];
			const destItems = [ ...destColumn.items ];
			const [ removed ] = sourceItems.splice(source.index, 1);
			destItems.splice(destination.index, 0, removed);

			const newColumns = {
				...columns,
				[source.droppableId]:
					{
						...sourceColumn,
						items: sourceItems,
					},
				[destination.droppableId]:
					{
						...destColumn,
						items: destItems,
					},
			};

			// console.log(newColumns);
		}
		else {
			handleDragAndDropIn1List(destination, taskId, source);
		}
	};

	const handleDragAndDropIn1List = async (
		destination: DraggableLocation,
		taskId: string,
		source: DraggableLocation,
	) => {
		const changeListOfTaskWithDragAndDropInput = { destination: { index: destination.index }, _taskId: taskId };

		// start improve UX
		const oldColumns = { ...columns };
		dispatch(
			changeListInTaskSocket({
				destination: { ...destination, _listId: destination.droppableId },
				_taskId: taskId,
				source: { ...source, _listId: source.droppableId },
			}),
		);
		// end improve UX

		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onDragAndDropIn1List,
			variables: { changeListOfTaskWithDragAndDropInput },
		});

		if (!isError) {
			dispatch(changeListInTaskSocket(data));
		}
		else {
			dispatch(getListsFormatted(oldColumns));
		}
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
