import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { io } from 'socket.io-client';
// Redux
import { RootState } from '../../../app/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import * as taskListAction from '../../../features/taskList/slice';
// component
import WorkSpace from './workSpace/workSpace';
// import WithFetchedData from '../../../hocs/withFetchedData';
import LoadingView from '../../shared/loadingView/loadingView';
// import ErrorView from '../../shared/errorView/errorView';
// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { ITaskList, ITask } from './interfaces';
import { ITaskLists, IInitialState } from '../../../features/taskList/interfaces';
// graphql
import { queries } from './schema/queries';
// fake data from be
export const itemsFromBe: Array<ITask> = [
	{ _listId: '1', content: 'first task' },
	{ _listId: '2', content: 'two task' },
	{ _listId: '3', content: 'three task' },
];

export const columnsFromBe: ITaskList = {
	'1':
		{
			name: 'To Do',
			items: itemsFromBe,
		},
	'2':
		{
			name: 'In Progress',
			items: [],
		},
	'3':
		{
			name: 'Review',
			items: [],
		},
};

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
	const socketRef = useRef(
		io('http://localhost:5000', {
			reconnection: false,
		}),
	);

	// use effect
	useEffect(
		() => {
			if (loading || error) return;

			const newTaskList: Array<ITaskLists> = data.taskLists;
			dispatch(taskListAction.getTaskLists(newTaskList));

			socketRef.current.on('message', data => {
				setColumns(data);
			});
		},
		[ data, dispatch, loading, error ],
	);

	// handle event
	const handleDragEnd = useCallback((result: DropResult, columns: ITaskList) => {
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

	// render;
	if (loading) {
		return <LoadingView />;
	}
	if (error) {
		// return <ErrorView error={error} />;
		return <WorkSpace columns={columns} onDragEnd={handleDragEnd} />;
	}
	return <WorkSpace columns={columns} onDragEnd={handleDragEnd} />;
};

export default BoardTask;
