import { useMutation } from '@apollo/client';
import { CHANGE_TASK_DESCRIPTIONS_MUTATION } from 'apis/task/mutations';
import TinyMce from 'components/shared/tinyMce/tinyMce';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ITask } from 'slices/task/interfaces';
import { changeTask } from 'slices/taskList/slice';

interface IProps {
	task: ITask;
}

const Description: React.FC<IProps> = ({ task }) => {
	const [ onChangeTaskDescriptions ] = useMutation(CHANGE_TASK_DESCRIPTIONS_MUTATION);
	const [ isShowDescription, setIsShowDescriptions ] = useState(false);
	const [ descriptions, setDescriptions ] = useState<string>(task.descriptions);
    const dispatch = useDispatch();
    
	const handleGetDes = async (text: string) => {
		if (task.descriptions !== text) {
			const { isError, data } = await fetchDataAndShowNotify({
				fnFetchData: onChangeTaskDescriptions,
				variables:
					{
						changeDescriptionsInput:
							{
								_taskId: task._id,
								descriptions: text,
							},
					},
			});

			if (!isError) {
				dispatch(changeTask(data));
				setDescriptions(text);
			}
		}
		setIsShowDescriptions(false);
	};

	return (
		<div className='des-task'>
			{!isShowDescription && (
				<div className='des-task__content' onClick={() => setIsShowDescriptions(true)}>
					Add Description
				</div>
			)}

			{isShowDescription && <TinyMce onGetText={handleGetDes} marginTop='20px' initialValue={descriptions} />}

			{!isShowDescription && <div className='html-tags' dangerouslySetInnerHTML={{ __html: descriptions }} />}
		</div>
	);
};

export default Description;

