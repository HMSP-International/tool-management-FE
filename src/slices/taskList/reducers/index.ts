// reducers
import { createNewList } from './createNewList';
import { createTaskInList } from './createTaskInList';
import { deleteTasksInList } from './deleteTasksInList';
import { getListsFormatted } from './getListsFormatted';
import { getTasksInList } from './getTasksInList';

const reducers = { createNewList, createTaskInList, deleteTasksInList, getListsFormatted, getTasksInList };

export default reducers;
