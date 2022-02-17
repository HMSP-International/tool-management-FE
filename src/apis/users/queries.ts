import { gql } from '@apollo/client';

export const GET_USER_BY_ID_QUERY = gql`
	query GetUserById($getUserByIdInput: GetUserByIdInput!) {
		getUserById(getUserByIdInput: $getUserByIdInput) {
			_id
			displayName
			email
		}
	}
`;
