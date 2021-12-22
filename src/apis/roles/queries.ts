import { gql } from '@apollo/client';

export const GET_ROLES_QUERY = gql`
	query ROLE {
		getRoles {
			_id
			name
		}
	}
`;
