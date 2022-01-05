import React, { useEffect, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
// component
import WorkSpace from './workSpace/workSpace';
// import WithFetchedData from '../../../hocs/withFetchedData';
import LoadingView from '../../shared/loadingView/loadingView';
// import ErrorView from '../../shared/errorView/errorView';
// interfaces
import { DropResult } from 'react-beautiful-dnd';
import { IList, ITaskList } from 'slices/taskList/interfaces';
// graphql
import { GET_LISTS_MUTATION } from 'apis/taskList/mutations';
// helpers
import { convertTaskList } from 'helpers/formatData/convertTaskList';
// redux
import { useDispatch } from 'react-redux';
import { getListsFormatted } from 'slices/taskList/slice';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';

const Manage: React.FC = () => {
	const params = useParams();
	const navigate = useNavigate();

	// redux
	const dispatch = useDispatch();

	// fetch data
	const [ onGetLists, { loading: loadingGetLists } ] = useMutation(GET_LISTS_MUTATION);

	// use effect
	useEffect(
		() => {
			if (loadingGetLists) return;

			const getData = async () => {
				const { data, isError } = await fetchDataAndShowNotify({
					fnFetchData: onGetLists,
					variables:
						{
							getListsInput:
								{
									_projectId: params._id,
								},
						},
					isNotShowNotify: true,
				});

				if (isError) {
					navigate('/notFound');
				}
				else {
					const lists: IList[] = data;
					const formatted = convertTaskList(lists);
					dispatch(getListsFormatted(formatted));
				}
			};

			getData();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[ navigate, dispatch, onGetLists, params._id ],
	);

	useEffect(
		() => {
			dispatch(getListsFormatted({}));
		},
		[ dispatch ],
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

	return <WorkSpace onDragEnd={handleDragEnd} />;
};

export default Manage;
