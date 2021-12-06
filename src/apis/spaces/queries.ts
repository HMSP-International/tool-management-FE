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

export const FIND_USERS_BY_SPACE_ID_QUERY = gql`
	query findUsersBySpaceId($findUsersBySpaceId: FindUsersBySpaceId!) {
		findUsersBySpaceId(findUsersBySpaceId: $findUsersBySpaceId) {
			_id
			_memberId {
				_id
				displayName
				email
				department
				position
				title
			}
		}
	}
`;
