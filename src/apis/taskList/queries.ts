import { gql } from '@apollo/client';

export const GET_LISTS_QUERY = gql`
	query GET_LISTS($getListsInput: GetListsInput!) {
		getLists(getListsInput: $getListsInput) {
			_id
			_projectId
			name
		}
	}
`;
