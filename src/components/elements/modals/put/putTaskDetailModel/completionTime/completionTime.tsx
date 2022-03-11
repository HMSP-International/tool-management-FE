import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { AiOutlineCheck } from 'react-icons/ai';
import { changeTask } from 'slices/taskList/slice';
import { isNumeric } from 'helpers/number/isNumeric';
import { CompletionTimeStyled } from './completionTime.styled';
import { CHANGE_COMPLETION_TIME_OF_TASK_MUTATION } from 'apis/task/mutations';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';

interface IProps {
	taskId: string;
	completionTime: number;
}

const CompletionTime: React.FC<IProps> = ({ taskId, completionTime }) => {
	const [ time, setTime ] = React.useState<string | number>(completionTime === 0 ? '' : completionTime);
	const [ defaultTime, setDefaultTime ] = React.useState<string | number>(completionTime === 0 ? '' : completionTime);
	const [ isChange, setIsChange ] = React.useState(false);
	const dispatch = useDispatch();
	const [ onChangeCompletionTime ] = useMutation(CHANGE_COMPLETION_TIME_OF_TASK_MUTATION);

	const handleSubmitChangeTaskCompletionTime = async () => {
		if (time === '') return;

		const { isError, data } = await fetchDataAndShowNotify({
			fnFetchData: onChangeCompletionTime,
			variables:
				{
					changeCompletionTimeInput:
						{
							_taskId: taskId,
							completionTime: time,
						},
				},
		});

		if (!isError) {
			dispatch(changeTask(data));
			setDefaultTime(time);
			setIsChange(false);
		}
	};

	const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
		const input = e.currentTarget.value;

		if (input === '') setIsChange(0 !== defaultTime);
		else setIsChange(Number.parseInt(input) !== defaultTime);

		if (input === '') setTime(input);
		else if (isNumeric(input)) {
			setTime(Number.parseInt(input));
		}
	};

	return (
		<CompletionTimeStyled>
			<label>Completion Time (hour unit)</label>
			<div className='input'>
				<input
					type='text'
					placeholder='Enter the number of hours to complete the task '
					value={time}
					onChange={handleChangeInput}
				/>

				{isChange && (
					<button className='btn-ok' onClick={handleSubmitChangeTaskCompletionTime}>
						<AiOutlineCheck />
					</button>
				)}
			</div>
		</CompletionTimeStyled>
	);
};

export default CompletionTime;
