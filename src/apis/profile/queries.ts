import { gql } from '@apollo/client';

export const GET_PROFILE_QUERY = gql`
	query UserSchema {
		getProfile {
			displayName
			_id
			email
			password
			position
			department
			title
			role
		}
	}
`;
