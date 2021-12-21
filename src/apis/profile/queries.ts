import { gql } from '@apollo/client';

export const GET_PROFILE_QUERY = gql`
	query UserSchema {
		getProfile {
			avatar
			displayName
			_id
			email
			password
			position
			department
			title
			_roleId
		}
	}
`;
