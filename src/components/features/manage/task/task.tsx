import React, { useState } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

// Styled Components
import { TaskStyled } from './task.styled';
import Image from 'components/shared/image/image';
import PutTaskDetail from 'components/elements/modals/put/putTaskDetailModel/putTaskDetailModel';
// interfaces
import { ITask } from 'slices/task/interfaces';
// graphql
import { useMutation } from '@apollo/client';
import { GET_TASK_DETAIL_MUTATION } from 'apis/task/mutations';
// helpers
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';

// interfaces
interface IProps {
	provided: DraggableProvided;
	snapshot: DraggableStateSnapshot;
	item: ITask;
	listId: string;
}

const Task: React.FC<IProps> = ({ provided, snapshot, item }) => {
	const [ isshowDetailTask, setIsShowDetailTask ] = useState(false);
	const [ currentTask, setCurrentTask ] = useState<ITask>(item);

	const [ onGetTaskDetail ] = useMutation(GET_TASK_DETAIL_MUTATION);

	const handleShowTaskDetail = async () => {
		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onGetTaskDetail,
			variables:
				{
					getTaskByIdInput:
						{
							_taskId: item._id,
						},
				},
		});

		if (!isError) {
			setCurrentTask(data);
			setIsShowDetailTask(true);
		}
	};

	return (
		<React.Fragment>
			<TaskStyled
				ref={provided.innerRef}
				{...provided.draggableProps}
				{...provided.dragHandleProps}
				style={{
					backgroundColor: snapshot.isDragging ? '#f4f5f7' : '',
					...provided.draggableProps.style,
				}}
				onClick={handleShowTaskDetail}
			>
				<div className='task-name'>{item.name}</div>
				<div className='task-type'>{}</div>
				<div className='task-bottom'>
					<div className='task-bottom__project'>{}</div>
					<div className='task-bottom__avt'>
						{item.assignee !== null ? (
							<Image public_id={item.assignee.avatar} w={50} h={50} tooltip={item.assignee.email} />
						) : (
							<img src='https://static.thenounproject.com/png/1868398-200.png' alt='' />
						)}
					</div>
				</div>
			</TaskStyled>

			{isshowDetailTask && (
				<PutTaskDetail hidden={isshowDetailTask} setHidden={setIsShowDetailTask} task={currentTask} />
			)}
		</React.Fragment>
	);
};

export default Task;
