import React, { useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
// component
import WorkSpace from './workSpace/workSpace';
// import WithFetchedData from '../../../hocs/withFetchedData';
import LoadingView from '../../shared/loadingView/loadingView';
// import ErrorView from '../../shared/errorView/errorView';
// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { IList, ITaskList } from 'slices/taskList/interfaces';
// graphql
import { GET_LISTS_QUERY } from 'apis/taskList/queries';
// helpers
import { convertTaskList } from 'helpers/formatData/convertTaskList';
// redux
import { useDispatch } from 'react-redux';
import { getListsFormatted } from 'slices/taskList/slice';

const Manage: React.FC = () => {
	const params = useParams();
	const navigate = useNavigate();

	// redux
	const dispatch = useDispatch();

	// fetch data
	const { loading: loadingGetLists, data: dataGetLists, error: errorGetLists } = useQuery(GET_LISTS_QUERY, {
		variables:
			{
				getListsInput:
					{
						_projectId: params._id,
					},
			},
	});

	// use effect
	useEffect(
		() => {
			if (loadingGetLists) return;

			if (dataGetLists) {
				const lists: IList[] = dataGetLists.getLists;

				const formatted = convertTaskList(lists);

				dispatch(getListsFormatted(formatted));
			}
			else {
				navigate('notFound');
			}
		},
		[ dataGetLists, loadingGetLists, navigate, dispatch ],
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

			console.log(newColumns);
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

			console.log(newColumns);
		}
	}, []);

	// render;
	if (loadingGetLists) {
		return <LoadingView />;
	}
	if (errorGetLists) {
		return <Navigate to='/notFound' />;
	}

	return <WorkSpace onDragEnd={handleDragEnd} />;
};

export default Manage;
