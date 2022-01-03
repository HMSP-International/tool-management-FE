import React, { useState } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

// Styled Components
import { TaskStyled } from './task.styled';
import PutTaskDetail from 'components/elements/modals/put/putTaskDetailModel/putTaskDetailModel';
import { ITask } from 'slices/task/interfaces';
import Image from 'components/shared/image/image';

// interfaces
interface IProps {
	provided: DraggableProvided;
	snapshot: DraggableStateSnapshot;
	item: ITask;
	listId: string;
}

const Task: React.FC<IProps> = ({ provided, snapshot, item }) => {
	const [ isshowDetailTask, setIsShowDetailTask ] = useState(false);
	console.log('item', item);

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
				onClick={() => setIsShowDetailTask(true)}
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
				<PutTaskDetail hidden={isshowDetailTask} setHidden={setIsShowDetailTask} task={item} />
			)}
		</React.Fragment>
	);
};

export default Task;
