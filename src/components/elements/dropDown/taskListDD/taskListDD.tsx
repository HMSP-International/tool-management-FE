import * as React from 'react';
import { Menu } from 'antd';
import { AiFillSetting } from 'react-icons/ai';
import { DropDownStyled, MenuStyled } from './taskListDD.styled';

// components
import CreateTaskDetailModal from '../../modals/create/createTaskDetailModal/createTaskDetailModal';
import DeleteTaskListModal from '../../modals/delete/deleteTaskListModal/deleteTaskListModal';
import ChangeNameList from '../../modals/put/changeListModal/changeListModal';
// redux
import { useSelector } from 'react-redux';
// interfaces
import { RootState } from 'global/redux/rootReducer';
import { IInitialStatePaticipant } from 'slices/paticipant/interfaces';

interface IProps {
	listId: string;
}

const WorkSpaceDropDown: React.FC<IProps> = ({ listId }) => {
	const [ isShowCreateTask, setIsShowCreateTask ] = React.useState(false);
	const [ isShowChangeList, setIsShowChangeList ] = React.useState(false);
	const [ isShowDeleteTaskList, setIsShowDeleteTaskList ] = React.useState(false);

	const { currentPaticipant }: IInitialStatePaticipant = useSelector((state: RootState) => state.paticipant);

	const menu =
		currentPaticipant === null ? (
			<MenuStyled>
				<Menu.Item className='menu-item' key={1}>
					<button onClick={() => setIsShowCreateTask(true)}>Create Task</button>
				</Menu.Item>
				<Menu.Item className='menu-item' key={2}>
					<button onClick={() => setIsShowChangeList(true)}>Edit List</button>
				</Menu.Item>
				<Menu.Item className='menu-item' key={3}>
					<button onClick={() => setIsShowDeleteTaskList(true)}>Delete List</button>
				</Menu.Item>
			</MenuStyled>
		) : (
			<MenuStyled>
				<Menu.Item className='menu-item' key={1}>
					<button onClick={() => setIsShowCreateTask(true)}>Create Task</button>
				</Menu.Item>
			</MenuStyled>
		);

	return (
		<React.Fragment>
			{currentPaticipant !== null &&
			currentPaticipant.role !== 'member' && (
				<DropDownStyled overlay={menu} placement='bottomRight' trigger={[ 'click' ]}>
					<button className='container-icon'>
						<AiFillSetting />
					</button>
				</DropDownStyled>
			)}

			{currentPaticipant === null && (
				<DropDownStyled overlay={menu} placement='bottomRight' trigger={[ 'click' ]}>
					<button className='container-icon'>
						<AiFillSetting />
					</button>
				</DropDownStyled>
			)}

			{isShowCreateTask && (
				<CreateTaskDetailModal hidden={isShowCreateTask} setHidden={setIsShowCreateTask} listId={listId} />
			)}

			{isShowChangeList && (
				<ChangeNameList hidden={isShowChangeList} setHidden={setIsShowChangeList} listId={listId} />
			)}

			{isShowDeleteTaskList && (
				<DeleteTaskListModal
					hidden={isShowDeleteTaskList}
					setHidden={setIsShowDeleteTaskList}
					listId={listId}
				/>
			)}
		</React.Fragment>
	);
};

export default WorkSpaceDropDown;
