import { useMutation } from '@apollo/client';
import { CHANGE_TASK_NAME_MUTATION } from 'apis/task/mutations';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { AiOutlineCheck } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IInitialStateTask } from 'slices/task/interfaces';
import { changeTask } from 'slices/taskList/slice';
import { NameTaskStyled } from './nameTask.styled';
import { RootState } from 'global/redux/rootReducer';
import { changeCurrentTaskModal } from 'slices/task/slice';

interface IProps {}

const NameTask: React.FC<IProps> = () => {
	const taskRedux: IInitialStateTask = useSelector((state: RootState) => state.task);
	const [ name, setName ] = useState(taskRedux.currentTask[0].name);
	const [ wasChanged, setWasChanged ] = useState(false);
	const dispatch = useDispatch();
	const [ onChangeTaskName ] = useMutation(CHANGE_TASK_NAME_MUTATION);

	const handleSubmitChangeTaskName = async () => {
		if (taskRedux.currentTask[0].name !== name) {
			const { isError, data } = await fetchDataAndShowNotify({
				fnFetchData: onChangeTaskName,
				variables:
					{
						changeTaskNameInput:
							{
								_taskId: taskRedux.currentTask[0]._id,
								name,
							},
					},
			});

			if (!isError) {
				setName(data.name);
				setWasChanged(false);
				dispatch(changeCurrentTaskModal(data));
				dispatch(changeTask(data));
			}
			else {
				setName(taskRedux.currentTask[0].name);
				setWasChanged(true);
			}
		}
	};

	const handeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;

		if (value !== taskRedux.currentTask[0].name) {
			setWasChanged(true);
		}
		else {
			setWasChanged(false);
		}
		setName(value);
	};

	const handleCancel = () => {
		setName(taskRedux.currentTask[0].name);
		setWasChanged(false);
	};

	return (
		<NameTaskStyled>
			<input
				type='text'
				value={name}
				placeholder='Enter your taskRedux.currentTask[0] Name...'
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
