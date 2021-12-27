import { gql } from '@apollo/client';

export const GET_INVITED_SPACES_QUERY = gql`
	query GET_INVITED_SPACES {
		getInvitedSpaces {
			_id
			_workSpaceId {
				_id
				name
				order
				owner
			}
			_memberId {
				displayName
				department
				position
				title
				email
				_id
			}
			_adminId
			role
			confirmEmail
		}
	}
`;
