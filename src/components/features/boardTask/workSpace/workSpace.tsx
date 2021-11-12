import React, { useState, useEffect, Dispatch, useRef } from 'react';
import { io } from 'socket.io-client';

// 3rd Components
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../list/list';

// Styled Components
import { WorkSpaceStyled } from './workSpace.styled';

// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { ILists, ITask } from '../iBoardTask';

const itemsFromBe: Array<ITask> = [
	{ _listId: '1', content: 'first task' },
	{ _listId: '2', content: 'two task' },
	{ _listId: '3', content: 'three task' },
];

const columnsFromBe: ILists = {
	'1':
		{
			name: 'Requested',
			items: itemsFromBe,
		},
	'2':
		{
			name: 'To Do',
			items: [],
		},
	'3':
		{
			name: 'In Progress',
			items: [],
		},
	'4':
		{
			name: 'Done',
			items: [],
		},
	'5':
		{
			name: 'Review',
			items: [],
		},
	'6':
		{
			name: 'Pending',
			items: [],
		},
};

const WorkSpace: React.FC = () => {
	const [ columns, setColumns ] = useState(columnsFromBe);
	const socketRef = useRef(io('http://localhost:5000'));

	useEffect(() => {
		socketRef.current.on('message', data => {
			setColumns(data);
		});
	}, []);

	const onDragEnd = (
		result: DropResult,
		columns: ILists,
		setColumns: Dispatch<React.SetStateAction<ILists>>,
	) => {
		if (!result.destination) return;
		const { source, destination } = result;

		if (source.droppableId !== destination.droppableId) {
			const sourceColumn = columns[source.droppableId];
			const destColumn = columns[destination.droppableId];
			const sourceItems = [ ...sourceColumn.items ];
			const destItems = [ ...destColumn.items ];
			const [ removed ] = sourceItems.splice(source.index, 1);
			destItems.splice(destination.index, 0, removed);
			setColumns({
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
			});
			socketRef.current.emit('task-changed', {
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
			});
		}
		else {
			const column = columns[source.droppableId];
			const copiedItems = [ ...column.items ];
			const [ removed ] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);
			setColumns({
				...columns,
				[source.droppableId]:
					{
						...column,
						items: copiedItems,
					},
			});
			socketRef.current.emit('task-changed', {
				...columns,
				[source.droppableId]:
					{
						...column,
						items: copiedItems,
					},
			});
		}
	};

	return (
		<WorkSpaceStyled>
			<DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
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

export default WorkSpace;
