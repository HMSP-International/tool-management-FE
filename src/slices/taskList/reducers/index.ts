// reducers
import { changeList } from './changeList';
import { changeListInTaskModel } from './changeListInTaskModel';
import { changeListUserToFindTask } from './changeListUserToFindTask';
import { changeTask } from './changeTask';
import { createNewList } from './createNewList';
import { createTaskInList } from './createTaskInList';
import { deleteTaskList } from './deleteTaskList';
import { deleteTasksInList } from './deleteTasksInList';
import { getListsFormatted } from './getListsFormatted';
import { getTasksInList } from './getTasksInList';

const reducers = {
	changeTask,
	changeListInTaskModel,
	changeListUserToFindTask,
	changeList,
	createNewList,
	createTaskInList,
	deleteTaskList,
	deleteTasksInList,
	getListsFormatted,
	getTasksInList,
};

export default reducers;
