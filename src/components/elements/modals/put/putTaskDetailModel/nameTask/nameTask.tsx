import { useMutation } from '@apollo/client';
import { CHANGE_TASK_NAME_MUTATION } from 'apis/task/mutations';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { AiOutlineCheck } from 'react-icons/ai';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ITask } from 'slices/task/interfaces';
import { changeTask } from 'slices/taskList/slice';
import { NameTaskStyled } from './nameTask.styled';
import { changeCurrentTaskModal } from 'slices/task/slice';
// socket
import { taskEvents } from 'socketIO/events/taskEvents';
import { SocketContext } from 'socketIO/context';
import { useParams } from 'react-router-dom';

interface IProps {
	task: ITask;
}

const NameTask: React.FC<IProps> = ({ task }) => {
	const [ name, setName ] = useState(task.name);
	const [ wasChanged, setWasChanged ] = useState(false);
	const dispatch = useDispatch();
	const [ onChangeTaskName ] = useMutation(CHANGE_TASK_NAME_MUTATION);
	const params = useParams();
	const socket = useContext(SocketContext);

	const handleSubmitChangeTaskName = async () => {
		if (task.name !== name) {
			const { isError, data } = await fetchDataAndShowNotify({
				fnFetchData: onChangeTaskName,
				variables:
					{
						changeTaskNameInput:
							{
								_taskId: task._id,
								name,
							},
					},
			});

			if (!isError) {
				setName(data.name);
				setWasChanged(false);
				dispatch(changeCurrentTaskModal(data));
				dispatch(changeTask(data));

				socket.emit(taskEvents.changeTaskName, { data, _projectId: params._id || '' });
			}
			else {
				setName(task.name);
				setWasChanged(true);
			}
		}
	};

	const handeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;

		if (value !== task.name) {
			setWasChanged(true);
		}
		else {
			setWasChanged(false);
		}
		setName(value);
	};

	const handleCancel = () => {
		setName(task.name);
		setWasChanged(false);
	};

	return (
		<NameTaskStyled>
			<input
				type='text'
				value={name}
				placeholder='Enter your task name...'
				onChange={handeChange}
				name='taskName'
			/>

			{wasChanged && (
				<div className='button-group'>
					<button className='btn-ok' onClick={handleSubmitChangeTaskName}>
						<AiOutlineCheck />
					</button>
					<button className='btn-cancel' onClick={handleCancel}>
						X
					</button>
				</div>
			)}
		</NameTaskStyled>
	);
};

export default NameTask;
