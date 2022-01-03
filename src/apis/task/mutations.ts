import { gql } from '@apollo/client';

export const CREATE_TASK_MUTATION = gql`
	mutation CREATE_TASK($createTaskInput: CreateTaskInput!) {
		createTask(createTaskInput: $createTaskInput) {
			_id
			name
			_listId
			order
			reporter {
				_id
				avatar
				email
			}
			timestamp {
				createAt
				updateAt
			}
			_projectId {
				_id
			}
			assignee {
				_id
				avatar
				email
			}
		}
	}
`;

export const GET_TASKS_BY_LISTID_MUTATION = gql`
	mutation GET_TASKS_BY_LISTID($getTasksInput: GetTasksInput!) {
		getTasksByListId(getTasksInput: $getTasksInput) {
			_id
			name
			_listId
			order
			reporter {
				_id
				avatar
				email
			}
			timestamp {
				createAt
				updateAt
			}
			_projectId {
				_id
			}
			assignee {
				_id
				avatar
				email
			}
		}
	}
`;

export const DELETE_TASKS_MUTATION = gql`
	mutation DELETE_TASKS($deleteTaskInput: DeleteTaskInput!) {
		deleteTasks(deleteTaskInput: $deleteTaskInput) {
			_id
			name
			_listId
			order
			reporter {
				_id
				avatar
				email
			}
			timestamp {
				createAt
				updateAt
			}
			_projectId {
				_id
			}
			assignee {
				_id
				avatar
				email
			}
		}
	}
`;

export const CHANGE_ASSIGNEE_TASK_MUTATION = gql`
	mutation changeAssignee($changeAssigneeInput: ChangeAssigneeInput!) {
		changeAssignee(changeAssigneeInput: $changeAssigneeInput) {
			_id
			name
			_listId
			order
			reporter {
				_id
				avatar
				email
			}
			timestamp {
				createAt
				updateAt
			}
			_projectId {
				_id
			}
			assignee {
				_id
				avatar
				email
			}
		}
	}
`;
