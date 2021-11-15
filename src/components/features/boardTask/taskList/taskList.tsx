import React from 'react';
import Task from '../task/task';
import { DroppableStateSnapshot, DroppableProvided, Draggable } from 'react-beautiful-dnd';

// Styled Components
import { ListStyled } from './taskList.styled';

// interfaces
import { IDataColumn } from '../interfaces';
interface IProps {
	provided: DroppableProvided;
	snapshot: DroppableStateSnapshot;
	columnData: IDataColumn;
}

const List: React.FC<IProps> = ({ provided, snapshot, columnData }) => {
	return (
		<ListStyled
			{...provided.droppableProps}
			ref={provided.innerRef}
			style={{
				backgroundColor: snapshot.isDraggingOver ? 'lightGreen' : 'lightGray',
			}}
		>
			{columnData.items.map((item, index) => {
				return (
					<Draggable key={item._listId} draggableId={item._listId} index={index}>
						{(provided, snapshot) => {
							return <Task provided={provided} snapshot={snapshot} item={item} />;
						}}
					</Draggable>
				);
			})}
			{provided.placeholder}
		</ListStyled>
	);
};

export default List;
