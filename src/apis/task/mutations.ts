import { gql } from '@apollo/client';

export const CREATE_TASK_MUTATION = gql`
	mutation CREATE_TASK($createTaskInput: CreateTaskInput!) {
		createTask(createTaskInput: $createTaskInput) {
			_id
			_listId
			name
		}
	}
`;

export const GET_TASKS_BY_LISTID_MUTATION = gql`
	mutation GET_TASKS_BY_LISTID($getTasksInput: GetTasksInput!) {
		getTasksByListId(getTasksInput: $getTasksInput) {
			_id
			_listId
			name
		}
	}
`;
