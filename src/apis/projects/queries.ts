import { gql } from '@apollo/client';

export const GET_PROJECT_QUERY = gql`
	query GET_PROJECT($getProjectInput: GetProjectInput!) {
		getProject(getProjectInput: $getProjectInput) {
			_id
			_spaceId
			name
			order
			owner
		}
	}
`;
