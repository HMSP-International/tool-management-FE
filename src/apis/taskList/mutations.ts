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
