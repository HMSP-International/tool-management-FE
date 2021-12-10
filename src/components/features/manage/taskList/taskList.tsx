import React, { useEffect, useState } from 'react';
import Task from '../task/task';
import { DroppableStateSnapshot, DroppableProvided, Draggable } from 'react-beautiful-dnd';

// Styled Components
import { TaskListStyled } from './taskList.styled';
import LoadingView from 'components/shared/loadingView/loadingView';

// graphql
import { GET_TASKS_BY_LISTID_MUTATION } from 'apis/task/mutations';
import { useMutation } from '@apollo/client';

// interfaces
import { IDataColumn, ITask } from 'slices/taskList/interfaces';

interface IProps {
	provided: DroppableProvided;
	snapshot: DroppableStateSnapshot;
	columnData: IDataColumn;
	listId: string;
}

const List: React.FC<IProps> = ({ provided, snapshot, columnData, listId }) => {
	const [ onGetTasksByListId, { loading } ] = useMutation(GET_TASKS_BY_LISTID_MUTATION);
	const [ columnDataAddedItems, setColumnDataAddedItems ] = useState(columnData);

	useEffect(
		() => {
			const fetchData = async () => {
				const { data } = await onGetTasksByListId({
					variables:
						{
							getTasksInput:
								{
									_listId: listId,
								},
						},
				});

				const tasks: ITask[] = data.getTasksByListId;

				setColumnDataAddedItems(preState => ({ ...preState, items: tasks }));
			};

			fetchData();
		},
		[ listId, onGetTasksByListId ],
	);

	if (loading) return <LoadingView />;

	return (
		<TaskListStyled
			{...provided.droppableProps}
			ref={provided.innerRef}
			style={{
				backgroundColor: snapshot.isDraggingOver ? '#bcbec4' : '#f4f5f7',
			}}
		>
			{columnDataAddedItems.items.map((item, index) => {
				return (
					<Draggable key={item._id} draggableId={item._id} index={index}>
						{(provided, snapshot) => {
							return <Task provided={provided} snapshot={snapshot} item={item} />;
						}}
					</Draggable>
				);
			})}
			{provided.placeholder}
		</TaskListStyled>
	);
};

export default List;
