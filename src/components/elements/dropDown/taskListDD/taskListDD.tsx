import * as React from 'react';
import { Menu } from 'antd';
import { AiFillSetting } from 'react-icons/ai';
import { DropDownStyled, MenuStyled } from './taskListDD.styled';

// components
import TaskDetail from '../../modals/get/taskDetailModal/taskDetailModal';
import DeleteTaskListModal from '../../modals/delete/deleteTaskListModal/deleteTaskListModal';
import ChangeNameList from '../../modals/put/changeListModal/changeListModal';

interface IProps {
	listId: string;
}

const WorkSpaceDropDown: React.FC<IProps> = ({ listId }) => {
	const [ isShowCreateTask, setIsShowCreateTask ] = React.useState(false);
	const [ isShowChangeList, setIsShowChangeList ] = React.useState(false);
	const [ isShowDeleteTaskList, setIsShowDeleteTaskList ] = React.useState(false);

	const menu = (
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
	);

	return (
		<React.Fragment>
			<DropDownStyled overlay={menu} placement='bottomRight' trigger={[ 'click' ]}>
				<button className='container-icon'>
					<AiFillSetting />
				</button>
			</DropDownStyled>

			{isShowCreateTask && (
				<TaskDetail hidden={isShowCreateTask} setHidden={setIsShowCreateTask} listId={listId} />
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
