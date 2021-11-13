import React, { memo } from 'react';

// 3rd Components
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../taskList/taskList';

// Styled Components
import { WorkSpaceStyled } from './workSpace.styled';

// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { ILists } from '../iBoardTask';
interface IProps {
	columns: ILists;
	onDragEnd: (result: DropResult, columns: ILists) => void;
}

const WorkSpace: React.FC<IProps> = ({ columns, onDragEnd }) => {
	return (
		<WorkSpaceStyled>
			<DragDropContext onDragEnd={result => onDragEnd(result, columns)}>
				{Object.entries(columns).map(([ columnId, columnData ]) => (
					<Droppable key={columnId} droppableId={columnId}>
						{(provided, snapshot) => {
							return (
								<List
									snapshot={snapshot}
									provided={provided}
									columnData={columnData}
								/>
							);
						}}
					</Droppable>
				))}
			</DragDropContext>
		</WorkSpaceStyled>
	);
};

export default memo(WorkSpace);
