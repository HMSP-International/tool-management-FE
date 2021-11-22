import React, { memo } from 'react';

// 3rd Components
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../taskList/taskList';

// Styled Components
import { WorkSpaceStyled } from './workSpace.styled';

// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { ITaskList } from '../interfaces';
interface IProps {
	columns: ITaskList;
	onDragEnd: (result: DropResult, columns: ITaskList) => void;
}

const WorkSpace: React.FC<IProps> = ({ columns, onDragEnd }) => {
	return (
		<WorkSpaceStyled>
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
												<i>+</i>
											</div>
										</div>
									</div>
									<List
										snapshot={snapshot}
										provided={provided}
										columnData={columnData}
									/>
								</div>
							);
						}}
					</Droppable>
				))}
			</DragDropContext>
		</WorkSpaceStyled>
	);
};

export default memo(WorkSpace);
