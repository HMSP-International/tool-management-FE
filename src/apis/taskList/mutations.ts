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
