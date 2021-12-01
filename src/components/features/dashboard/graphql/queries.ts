import { gql } from '@apollo/client';

export const GET_USERS_QUERY = gql`
	query GetAllUsers {
		getUsers {
			_id
			department
			displayName
			email
			position
			role
			title
		}
	}
`;
