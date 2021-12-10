import React, { useState, useEffect, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
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
import { GET_LISTS_QUERY } from '../../../apis/taskList/queries';
import { GET_PROJECT_QUERY } from 'apis/projects/queries';
// helpers
import { convertTaskList } from 'global/helpers/convertTaskList';
import { IProject } from 'slices/project/interfaces';
import { CREATE_LIST_MUTATION } from 'apis/taskList/mutations';
import { openNotification } from 'global/helpers/notification';
import { handleApolloError } from 'global/helpers/apolloError';

const Manage: React.FC = () => {
	const params = useParams();
	const navigate = useNavigate();

	// use state
	const [ columns, setColumns ] = useState<ITaskList>({});
	const [ project, setProject ] = useState<IProject>({
		name: '',
		order: -1,
		owner: '',
		_id: '',
		_spaceId: '',
	});

	// fetch data
	const {
		loading: loadingGetLists,
		data: dataGetLists,
		errorInvitedSpace: errorGetLists,
	} = useQuery(GET_LISTS_QUERY, {
		variables:
			{
				getListsInput:
					{
						_projectId: params._id,
					},
			},
	});

	const {
		loading: loadingGetProject,
		data: dataGetProject,
		errorInvitedSpace: errorGetProject,
	} = useQuery(GET_PROJECT_QUERY, {
		variables:
			{
				getProjectInput:
					{
						_projectId: params._id,
					},
			},
	});

	const [ onCreateList, { loading: loadingCreateList } ] = useMutation(CREATE_LIST_MUTATION);

	// use effect
	useEffect(
		() => {
			if (loadingGetLists) return;

			if (dataGetLists) {
				const lists: IList[] = dataGetLists.getLists;
				setColumns(convertTaskList(lists));
			}
			else {
				navigate('notFound');
			}
		},
		[ dataGetLists, loadingGetLists, navigate ],
	);

	useEffect(
		() => {
			if (loadingGetProject) return;

			if (dataGetProject) {
				const project: IProject = dataGetProject.getProject;
				setProject(project);
			}
			else {
				navigate('notFound');
			}
		},
		[ dataGetProject, loadingGetProject, navigate ],
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

			setColumns(newColumns);
		}
	}, []);

	const handleCreateList = async (name: string) => {
		try {
			const { data } = await onCreateList({
				variables:
					{
						createListInput:
							{
								_projectId: project._id,
								name,
							},
					},
			});

			const list: IList = data.createList;
			const convertedList = convertTaskList([ list ]);
			setColumns(preState => ({ ...preState, ...convertedList }));

			const showing = {
				title: 'Susscess',
				extensions: [ 'Created new list' ],
			};
			openNotification(showing);
		} catch (error) {
			const showing = handleApolloError(error);
			openNotification(showing, true);
		}
	};

	// render;
	if (loadingGetLists || loadingGetProject || loadingCreateList) {
		return <LoadingView />;
	}
	if (errorGetLists || errorGetProject) {
		return <Navigate to='/notFound' />;
	}

	return (
		<WorkSpace
			columns={columns}
			onDragEnd={handleDragEnd}
			nameProject={project.name}
			onCreateList={handleCreateList}
		/>
	);
};

export default Manage;
