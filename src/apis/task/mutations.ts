import { gql } from '@apollo/client';

export const CREATE_TASK_MUTATION = gql`
	mutation CREATE_TASK($createTaskInput: CreateTaskInput!) {
		createTask(createTaskInput: $createTaskInput) {
			_id
			name
			_listId
			order
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
			assignee {
				_id
				avatar
				email
			}
		}
	}
`;

export const GET_TASK_DETAIL_MUTATION = gql`
	mutation getTaskById($getTaskByIdInput: GetTaskByIdInput!) {
		getTaskById(getTaskByIdInput: $getTaskByIdInput) {
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
			descriptions
			comments {
				_id
				_userId {
					_id
					avatar
					displayName
					email
				}
				content
				_taskId {
					_listId
					_id
				}
			}
		}
	}
`;

export const DELETE_TASKS_MUTATION = gql`
	mutation DELETE_TASKS($deleteTaskInput: DeleteTaskInput!) {
		deleteTasks(deleteTaskInput: $deleteTaskInput) {
			_id
			_listId
		}
	}
`;

export const CHANGE_ASSIGNEE_TASK_MUTATION = gql`
	mutation changeAssignee($changeAssigneeInput: ChangeAssigneeInput!) {
		changeAssignee(changeAssigneeInput: $changeAssigneeInput) {
			_listId
			order
			assignee {
				_id
				avatar
				email
			}
		}
	}
`;

export const CHANGE_TASK_NAME_MUTATION = gql`
	mutation ChangeTaskName($changeTaskNameInput: ChangeTaskNameInput!) {
		changeTaskName(changeTaskNameInput: $changeTaskNameInput) {
			_listId
			order
			name
		}
	}
`;

export const CHANGE_TASK_DESCRIPTIONS_MUTATION = gql`
	mutation changeDescriptions($changeDescriptionsInput: ChangeDescriptionsInput!) {
		changeDescriptions(changeDescriptionsInput: $changeDescriptionsInput) {
			_listId
			order
			descriptions
		}
	}
`;

export const CHANGE_LIST_OF_TASK_MUTATION = gql`
	mutation changeListOfTask($changeListOfTaskInput: ChangeListOfTaskInput!) {
		changeListOfTask(changeListOfTaskInput: $changeListOfTaskInput) {
			_id
			_listId
		}
	}
`;
