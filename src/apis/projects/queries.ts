import { gql } from '@apollo/client';

export const GET_PROJECT_BY_ID_QUERY = gql`
	query GET_PROJECT_BY_ID($getProjectInput: GetProjectInput!) {
		getProjectById(getProjectInput: $getProjectInput) {
			_id
			_spaceId
			name
			order
			owner
		}
	}
`;
