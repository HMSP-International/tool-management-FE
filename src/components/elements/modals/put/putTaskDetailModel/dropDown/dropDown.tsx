import { RootState } from 'global/redux/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { IInitialStateList } from 'slices/taskList/interfaces';
import { DropDownStyled } from './dropDown.styled';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { changeListInTaskModel } from 'slices/taskList/slice';

interface IProps {
	currentList: string;
	taskId: string;
}

const Dropdown: React.FC<IProps> = ({ currentList, taskId }) => {
	const listsRedux: IInitialStateList = useSelector((state: RootState) => state.taskList);
	const dispatch = useDispatch();

	const handleClickToChangeList = (_newListId: string) => {
		dispatch(changeListInTaskModel({ _oldListId: currentList, _newListId, _taskId: taskId }));
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
						const className = k === currentListId ? 'dropdown-list__item-active' : 'dropdown-list__item';
						return (
							<div key={index} className={className} onClick={() => handleClickToChangeList(k)}>
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
