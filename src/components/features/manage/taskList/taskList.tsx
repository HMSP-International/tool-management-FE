import React from 'react';
import Task from '../task/task';
import { DroppableStateSnapshot, DroppableProvided, Draggable } from 'react-beautiful-dnd';

// Styled Components
import { TaskListStyled } from './taskList.styled';

// interfaces
import { IDataColumn } from 'slices/taskList/interfaces';
interface IProps {
	provided: DroppableProvided;
	snapshot: DroppableStateSnapshot;
	columnData: IDataColumn;
}

const List: React.FC<IProps> = ({ provided, snapshot, columnData }) => {
	return (
		<TaskListStyled
			{...provided.droppableProps}
			ref={provided.innerRef}
			style={{
				backgroundColor: snapshot.isDraggingOver ? '#bcbec4' : '#f4f5f7',
			}}
		>
			{columnData.items.map((item, index) => {
				return (
					<Draggable key={item._id} draggableId={item._id} index={index}>
						{(provided, snapshot) => {
							return <Task provided={provided} snapshot={snapshot} item={item} />;
						}}
					</Draggable>
				);
			})}
			{provided.placeholder}
		</TaskListStyled>
	);
};

export default List;