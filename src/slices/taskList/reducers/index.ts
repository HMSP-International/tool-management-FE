// reducers
import { changeList } from './changeList';
import { changeListInTaskModel } from './changeListInTaskModel';
import { changeListInTaskSocket } from './changeListInTaskSocket';
import { changeListUserToFindTask } from './changeListUserToFindTask';
import { changeTask } from './changeTask';
import { createNewList } from './createNewList';
import { createTaskInList } from './createTaskInList';
import { deleteTaskList } from './deleteTaskList';
import { deleteTasksInList } from './deleteTasksInList';
import { getListsFormatted } from './getListsFormatted';
import { getTasksInList } from './getTasksInList';
import { renameList } from './renameList';

const reducers = {
	changeTask,
	changeListInTaskModel,
	changeListInTaskSocket,
	changeListUserToFindTask,
	changeList,
	createNewList,
	createTaskInList,
	deleteTaskList,
	deleteTasksInList,
	getListsFormatted,
	getTasksInList,
	renameList,
};

export default reducers;
