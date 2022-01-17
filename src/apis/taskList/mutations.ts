import { gql } from '@apollo/client';

export const CREATE_LIST_MUTATION = gql`
	mutation CreateList($createListInput: CreateListInput!) {
		createList(createListInput: $createListInput) {
			_id
			_projectId
			name
		}
	}
`;

export const DELETE_LIST_MUTATION = gql`
	mutation DELETE_LIST($deleteListInput: DeleteListInput!) {
		deleteList(deleteListInput: $deleteListInput) {
			_id
			_projectId
			name
			order
		}
	}
`;

export const CHANGE_NAME_LIST_MUTATION = gql`
	mutation CHANGE_NAME_LIST($changeNameListInput: ChangeNameListInput!) {
		changeNameList(changeNameListInput: $changeNameListInput) {
			_id
			_projectId
			name
			order
		}
	}
`;

export const GET_LISTS_MUTATION = gql`
	mutation GET_LISTS($getListsInput: GetListsInput!) {
		getLists(getListsInput: $getListsInput) {
			_id
			_projectId
			name
		}
	}
`;

export const PUT_LIST_OF_TASK_WITH_DRAG_AND_DROP_IN1LIST_MUTATION = gql`
	mutation changeListOfTaskWithDragAndDropInOneList(
		$changeListOfTaskWithDragAndDropIn1ListInput: ChangeListOfTaskWithDragAndDropIn1ListInput!
	) {
		changeListOfTaskWithDragAndDropInOneList(
			changeListOfTaskWithDragAndDropIn1ListInput: $changeListOfTaskWithDragAndDropIn1ListInput
		) {
			_taskId
			destination {
				_listId
				index
			}
			source {
				_listId
				index
			}
		}
	}
`;

export const PUT_LIST_OF_TASK_WITH_DRAG_AND_DROP_IN_ANOTHER_LIST_MUTATION = gql`
	mutation changeListOfTaskWithDragAndDropInAnotherList(
		$changeListOfTaskWithDragAndDropInAnotherListInput: ChangeListOfTaskWithDragAndDropInAnotherListInput!
	) {
		changeListOfTaskWithDragAndDropInAnotherList(
			changeListOfTaskWithDragAndDropInAnotherListInput: $changeListOfTaskWithDragAndDropInAnotherListInput
		) {
			_taskId
			destination {
				_listId
				index
			}
			source {
				_listId
				index
			}
		}
	}
`;
