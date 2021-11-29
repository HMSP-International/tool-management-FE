import { gql } from '@apollo/client';

export const GET_SPACE_QUERY = gql`
	query Space {
		getSpaces {
			_id
			name
			owner
			order
		}
	}
`;
