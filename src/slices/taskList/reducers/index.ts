// reducers
import { createNewList } from './createNewList';
import { createTaskInList } from './createTaskInList';
import { deleteTaskList } from './deleteTaskList';
import { deleteTasksInList } from './deleteTasksInList';
import { getListsFormatted } from './getListsFormatted';
import { getTasksInList } from './getTasksInList';

const reducers = {
	createNewList,
	createTaskInList,
	deleteTaskList,
	deleteTasksInList,
	getListsFormatted,
	getTasksInList,
};

export default reducers;
