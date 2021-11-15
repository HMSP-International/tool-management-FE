import React from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

// Styled Components
import { TaskStyled } from './task.styled';

// interfaces
import { ITask } from '../interfaces';
interface IProps {
	provided: DraggableProvided;
	snapshot: DraggableStateSnapshot;
	item: ITask;
}

const Task: React.FC<IProps> = ({ provided, snapshot, item }) => {
	return (
		<TaskStyled
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			style={{
				backgroundColor: snapshot.isDragging ? 'lightpink' : '',
				...provided.draggableProps.style,
			}}
		>
			{item.content}
		</TaskStyled>
	);
};

export default Task;
