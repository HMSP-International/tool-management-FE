import { gql } from '@apollo/client';

export const GET_SPACES_QUERY = gql`
	query Space {
		getSpaces {
			_id
			name
			owner
			order
		}
	}
`;
