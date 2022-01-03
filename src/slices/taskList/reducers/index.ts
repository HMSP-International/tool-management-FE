// reducers
import { changeTask } from './changeAssignee';
import { changeList } from './changeList';
import { createNewList } from './createNewList';
import { createTaskInList } from './createTaskInList';
import { deleteTaskList } from './deleteTaskList';
import { deleteTasksInList } from './deleteTasksInList';
import { getListsFormatted } from './getListsFormatted';
import { getTasksInList } from './getTasksInList';

const reducers = {
	changeTask,
	changeList,
	createNewList,
	createTaskInList,
	deleteTaskList,
	deleteTasksInList,
	getListsFormatted,
	getTasksInList,
};

export default reducers;
