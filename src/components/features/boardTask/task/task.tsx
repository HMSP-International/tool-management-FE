import React from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

// Styled Components
import { TaskStyled } from './task.styled';

// interfaces
import { ITask } from '../iBoardTask';
interface ITaskCpt {
	provided: DraggableProvided;
	snapshot: DraggableStateSnapshot;
	item: ITask;
}

const Task: React.FC<ITaskCpt> = ({ provided, snapshot, item }) => {
	return (
		<TaskStyled
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
			style={{
				backgroundColor: snapshot.isDragging ? 'lightpink' : 'rgb(199, 152, 82)',
				...provided.draggableProps.style,
			}}
		>
			{item.content}
		</TaskStyled>
	);
};

export default Task;
