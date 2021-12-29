import React from 'react';
// 3rd Components
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../taskList/taskList';
import TaskListDD from 'components/elements/dropDown/taskListDD/taskListDD';
// Styled Components
import Container from '../container/container';
// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { IInitialStateList, ITaskList } from 'slices/taskList/interfaces';
// redux
import { useSelector } from 'react-redux';
import { RootState } from 'global/redux/rootReducer';

interface IProps {
	onDragEnd: (result: DropResult, columns: ITaskList) => void;
}

const WorkSpace: React.FC<IProps> = ({ onDragEnd }) => {
	const { lists: columns }: IInitialStateList = useSelector((state: RootState) => state.taskList);

	return (
		<React.Fragment>
			<Container>
				<section className='workspace__body'>
					<DragDropContext onDragEnd={result => onDragEnd(result, columns)}>
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
