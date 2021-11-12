import React, { useState, useEffect, useRef, useCallback } from 'react';
import { io } from 'socket.io-client';

// component
import WorkSpace from './workSpace/workSpace';

// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { ILists } from './iBoardTask';

// fake data from be
import { columnsFromBe } from '../../../fakeData/aboard';

const BoardTask: React.FC = () => {
	// use state
	const [ columns, setColumns ] = useState(columnsFromBe);

	// use ref
	const socketRef = useRef(
		io('http://localhost:5000', {
			reconnection: false,
		}),
	);

	// use effect
	useEffect(() => {
		socketRef.current.on('message', data => {
			setColumns(data);
		});
	}, []);

	// handle event
	const handleDragEnd = useCallback((result: DropResult, columns: ILists) => {
		if (!result.destination) return;
		const { source, destination } = result;

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

			socketRef.current.emit('task-changed', newColumns);
			setColumns(newColumns);
		}
		else {
			const column = columns[source.droppableId];
			const copiedItems = [ ...column.items ];
			const [ removed ] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);

			const newColumns = {
				...columns,
				[source.droppableId]:
					{
						...column,
						items: copiedItems,
					},
			};

			socketRef.current.emit('task-changed', newColumns);
			setColumns(newColumns);
		}
	}, []);

	return <WorkSpace columns={columns} onDragEnd={handleDragEnd} />;
};

export default BoardTask;
