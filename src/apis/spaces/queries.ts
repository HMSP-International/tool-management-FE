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
			_memberId
			_adminId
			role
			confirmEmail
		}
	}
`;
