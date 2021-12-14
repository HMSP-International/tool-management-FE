import * as React from 'react';
import { Dropdown, Button, Menu } from 'antd';
// components
import TaskDetail from '../../modals/taskDetailModal/taskDetailModal';
import DeleteTaskListModal from '../../modals/deleteTaskListModal/deleteTaskListModal';

interface IProps {
	listId: string;
}

const WorkSpaceDropDown: React.FC<IProps> = ({ listId }) => {
	const [ isShowCreateTask, setIsShowCreateTask ] = React.useState(false);
	const [ isShowDeleteTaskList, setIsShowDeleteTaskList ] = React.useState(false);

	const menu = (
		<Menu>
			<Menu.Item>
				<i onClick={() => setIsShowCreateTask(true)}>Create Task</i>
			</Menu.Item>
			<Menu.Item>
				<i onClick={() => setIsShowDeleteTaskList(true)}>Delete List</i>
			</Menu.Item>
		</Menu>
	);

	return (
		<React.Fragment>
			<Dropdown overlay={menu} placement='bottomRight'>
				<Button>...</Button>
			</Dropdown>

			{isShowCreateTask && (
				<TaskDetail hidden={isShowCreateTask} setHidden={setIsShowCreateTask} listId={listId} />
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
