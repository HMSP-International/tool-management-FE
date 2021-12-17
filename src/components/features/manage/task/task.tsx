import React, { useState } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

// Styled Components
import { TaskStyled } from './task.styled';
import TaskDetail from '../../../elements/modals/get/taskDetailModal/taskDetailModal';
import { ITask } from 'slices/taskList/interfaces';

// interfaces
interface IProps {
	provided: DraggableProvided;
	snapshot: DraggableStateSnapshot;
	item: ITask;
	listId: string;
}

const Task: React.FC<IProps> = ({ provided, snapshot, item, listId }) => {
	const [ isshowDetailTask, setIsShowDetailTask ] = useState(false);

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
				<div className='task-type'>CREATE UI/UX</div>
				<div className='task-bottom'>
					<div className='task-bottom__project'>MT-1</div>
					<div className='task-bottom__avt'>
						<img src='https://upload.wikimedia.org/wikipedia/commons/f/ff/Green_icon.svg' alt='' />
					</div>
				</div>
			</TaskStyled>

			<TaskDetail hidden={isshowDetailTask} setHidden={setIsShowDetailTask} task={item} listId={listId} />
		</React.Fragment>
	);
};

export default Task;
