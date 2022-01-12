import { RootState } from 'global/redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { IInitialStateList } from 'slices/taskList/interfaces';
import { DropDownStyled } from './dropDown.styled';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { changeListInTaskModel } from 'slices/taskList/slice';
import { useMutation } from '@apollo/client';
import { CHANGE_LIST_OF_TASK_MUTATION } from 'apis/task/mutations';
import { fetchDataAndShowNotify } from 'helpers/graphql/fetchDataAndShowNotify';
interface IProps {
	currentList: string;
	taskId: string;
}

const Dropdown: React.FC<IProps> = ({ currentList, taskId }) => {
	const listsRedux: IInitialStateList = useSelector((state: RootState) => state.taskList);
	const [ onChangeListOfTask ] = useMutation(CHANGE_LIST_OF_TASK_MUTATION);
	const dispatch = useDispatch();

	const handleClickToChangeList = async (_newListId: string) => {
		const { isError } = await fetchDataAndShowNotify({
			fnFetchData: onChangeListOfTask,
			variables:
				{
					changeListOfTaskInput:
						{
							_taskId: taskId,
							_listId: _newListId,
						},
				},
		});

		if (!isError) {
			dispatch(changeListInTaskModel({ _oldListId: currentList, _newListId, _taskId: taskId }));
		}
	};

	const renderFn = (listsRedux: IInitialStateList, currentListId: string) => {
		const currentList = listsRedux.lists[currentListId] || { name: '' };
		const keys = Object.keys(listsRedux.lists);
		return (
			<DropDownStyled className='dropdown'>
				<div className='dropdown-select'>
					<span className='select'>{currentList.name}</span>
					<AiOutlineArrowDown />
				</div>
				<div className='dropdown-list'>
					{keys.map((k, index) => {
						if (k === currentListId) {
							return null;
						}
						return (
							<div key={index} className='dropdown-list__item' onClick={() => handleClickToChangeList(k)}>
								{listsRedux.lists[k].name}
							</div>
						);
					})}
				</div>
			</DropDownStyled>
		);
	};

	return renderFn(listsRedux, currentList);
};
export default Dropdown;
