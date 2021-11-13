import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
// import { io } from 'socket.io-client';
// Redux
import { RootState } from '../../../app/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import * as taskListAction from '../../../app/features/taskList/slice';
// component
import WorkSpace from './workSpace/workSpace';
import LoadingView from '../../shared/Loading/loading';
import ErrorView from '../../shared/Error/error';
// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { ILists } from './iBoardTask';
import { ITaskLists, IInitialState } from '../../../app/features/taskList/interfaces';
// fake data from be
import { columnsFromBe } from '../../../fakeData/aboard';
// graphql
import { queries } from './schema/queries';

const BoardTask: React.FC = () => {
	// fetch data
	const { loading, data, error } = useQuery(queries.taskLists);

	// dispatch
	const dispatch = useDispatch();

	// selector
	const taskListRedux: IInitialState = useSelector((rootState: RootState) => rootState.taskList);
	console.log(taskListRedux.taskLists);

	// use state
	const [ columns, setColumns ] = useState(columnsFromBe);

	// use ref
	// const socketRef = useRef(
	// 	io('http://localhost:5000', {
	// 		reconnection: false,
	// 	}),
	// );

	// use effect
	useEffect(
		() => {
			if (loading || error) return;

			const newTaskList: Array<ITaskLists> = data.taskLists;
			dispatch(taskListAction.getTaskLists(newTaskList));

			// socketRef.current.on('message', data => {
			// 	setColumns(data);
			// });
		},
		[ data, dispatch, loading, error ],
	);

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

			// socketRef.current.emit('task-changed', newColumns);
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

			// socketRef.current.emit('task-changed', newColumns);
			setColumns(newColumns);
		}
	}, []);

	// render
	if (loading) {
		return <LoadingView />;
	}
	if (error) {
		return <ErrorView />;
	}
	return <WorkSpace columns={columns} onDragEnd={handleDragEnd} />;
};

export default BoardTask;
