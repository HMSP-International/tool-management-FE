import { useParams } from 'react-router-dom';
import React, { useEffect } from 'react';
import Task from '../task/task';
import { DroppableStateSnapshot, DroppableProvided, Draggable } from 'react-beautiful-dnd';

// Styled Components
import { TaskListStyled } from './taskList.styled';
import LoadingView from 'components/shared/loadingView/loadingView';

// graphql
import { GET_TASKS_BY_LISTID_MUTATION } from 'apis/task/mutations';
import { useMutation } from '@apollo/client';

// interfaces
import { IDataColumn } from 'slices/taskList/interfaces';
import { ITask } from 'slices/task/interfaces';

// Redux
import { useDispatch } from 'react-redux';
import { getTasksInList } from 'slices/taskList/slice';
import { mainParamPage } from 'global/routes/page';

interface IProps {
	provided: DroppableProvided;
	snapshot: DroppableStateSnapshot;
	columnData: IDataColumn;
	listId: string;
}

const List: React.FC<IProps> = ({ provided, snapshot, columnData, listId }) => {
	const [ onGetTasksByListId, { loading } ] = useMutation(GET_TASKS_BY_LISTID_MUTATION);
	const dispatch = useDispatch();
	const params = useParams();

	useEffect(
		() => {
			const fetchData = async () => {
				const { data } = await onGetTasksByListId({
					variables:
						{
							getTasksInput:
								{
									_listId: listId,
									_userIds:
										params[mainParamPage.userId] === undefined
											? []
											: [ params[mainParamPage.userId] ],
								},
						},
				});

				const tasks: ITask[] = data.getTasksByListId;
				dispatch(getTasksInList({ key: listId, items: tasks }));
			};

			fetchData();
		},
		[listId, onGetTasksByListId, dispatch, params],
	);

	if (loading) return <LoadingView />;

	const sorted = [ ...columnData.items ].sort((a, b) => a.order - b.order);

	return (
		<TaskListStyled
			{...provided.droppableProps}
			ref={provided.innerRef}
			style={{
				backgroundColor: snapshot.isDraggingOver ? '#bcbec4' : '#f4f5f7',
			}}
		>
			{sorted.map((item, index) => {
				return (
					<Draggable key={item._id} draggableId={item._id} index={index}>
						{(provided, snapshot) => {
							return <Task provided={provided} snapshot={snapshot} item={item} listId={listId} />;
						}}
					</Draggable>
				);
			})}
			{provided.placeholder}
		</TaskListStyled>
	);
};

export default List;
