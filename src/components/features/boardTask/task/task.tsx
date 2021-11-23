import React, { useState } from 'react';
import { DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

// Styled Components
import { TaskStyled } from './task.styled';
import TaskDetail from '../taskDetail/taskDetail';

// interfaces
import { ITask } from '../interfaces';
interface IProps {
	provided: DraggableProvided;
	snapshot: DraggableStateSnapshot;
	item: ITask;
}

const Task: React.FC<IProps> = ({ provided, snapshot, item }) => {
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
				<div className='task-name'>{item.content}</div>
				<div className='task-type'>CREATE UI/UX</div>
				<div className='task-bottom'>
					<div className='task-bottom__project'>MT-1</div>
					<div className='task-bottom__avt'>
						<img
							src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Disc_Plain_red.svg/1200px-Disc_Plain_red.svg.png'
							alt=''
						/>
					</div>
				</div>
			</TaskStyled>

			<TaskDetail hidden={isshowDetailTask} setHidden={setIsShowDetailTask} />
		</React.Fragment>
	);
};

export default Task;
